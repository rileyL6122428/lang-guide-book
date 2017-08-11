package com.l2kstudios.languageguidebook.server.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.l2kstudios.languageguidebook.server.model.Translator;
import com.l2kstudios.languageguidebook.server.service.AuthenticationService;
import com.l2kstudios.languageguidebook.server.service.TranslatorService;

@RestController
public class SessionController {
	
	@Autowired
	private TranslatorService translatorService;
	
	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping(value = "/session", produces = "application/json")
	public Object createSession(HttpServletRequest request, HttpServletResponse response) {
		Translator translator = getTranslator(request);
		String password = request.getParameter("password");
		
		if(authenticationService.passwordIsAuthenticated(translator, password)) {
			authenticationService.incrementSessionToken(translator, response);
			response.setStatus(Response.SC_CREATED);
			
			return translator;
		} else {
			response.setStatus(Response.SC_FORBIDDEN);
			return "SESSION NOT CREATED";
		}
		
	}	
	
	@GetMapping(value = "/session")
	public Object getSession(HttpServletRequest request, HttpServletResponse response) {
		Translator translator = getTranslator(request);
		
		if(authenticationService.sessionTokenIsAuthentic(translator, request)) {
			authenticationService.incrementSessionToken(translator, response);
			response.setStatus(Response.SC_OK);
			return "SESSION INCREMENTED";
		} else {
			authenticationService.removeSessionToken(translator, response);
			response.setStatus(Response.SC_FORBIDDEN);
			return "SESSION NULLIFIED";
		}
	}

	@DeleteMapping(value="/session")
	public Object deleteSession(HttpServletRequest request, HttpServletResponse response) {
		Translator translator = getTranslator(request);
		authenticationService.removeSessionToken(translator, response);
		response.setStatus(Response.SC_OK);
		return "SESSION DELETED";
	}
	
	private Translator getTranslator(HttpServletRequest request) {
		String username = request.getParameter("username");
		return translatorService.get(username);
	}
	
}
