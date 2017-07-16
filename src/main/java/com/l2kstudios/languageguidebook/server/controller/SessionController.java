package com.l2kstudios.languageguidebook.server.controller;

import static com.l2kstudios.languageguidebook.server.constants.SessionConstants.SESSION_COOKIE_NAME;
import static com.l2kstudios.languageguidebook.server.constants.SessionConstants.SESSION_TIME_LIMIT;

import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.l2kstudios.languageguidebook.server.model.Translator;
import com.l2kstudios.languageguidebook.server.service.TranslatorService;

@RestController
public class SessionController {
	
	@Autowired
	private TranslatorService translatorService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping(value = "/session")
	public Object createSession(HttpServletRequest request, HttpServletResponse response) {
		Translator translator = getTranslator(request);
		String password = request.getParameter("password");
		
		if(authenticated(translator, password)) {
			setSessionToken(translator, response);
			response.setStatus(Response.SC_CREATED);
			return "SESSION CREATED";
		} else {
			response.setStatus(Response.SC_FORBIDDEN);
			return "SESSION NOT CREATED";
		}
		
	}	

	private boolean authenticated(Translator translator, String password) {
		return translator != null && bCryptPasswordEncoder.matches(password, translator.getEncryptedPassword());			
	}

	private void setSessionToken(Translator translator, HttpServletResponse response) {
		UUID sessionID = UUID.randomUUID();
		saveCookieToResponse(sessionID, response);
		saveSessionIDToTranslator(sessionID, translator);
	}
	
	private void saveCookieToResponse(UUID sessionID, HttpServletResponse response) {
		Cookie sessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionID.toString());
		sessionCookie.setHttpOnly(true);
		sessionCookie.setMaxAge(SESSION_TIME_LIMIT);
		response.addCookie(sessionCookie);
	}

	private void saveSessionIDToTranslator(UUID sessionID, Translator translator) {
		translator.setSessionToken(sessionID.toString());
		translatorService.save(translator);
	}
	
	@GetMapping(value = "/session")
	public Object getSession(HttpServletRequest request, HttpServletResponse response) {
		Translator translator = getTranslator(request);
		
		if(sessionIdIsAuthentic(translator, request)) {
			setSessionToken(translator, response);
			response.setStatus(Response.SC_OK);
			return "SESSION INCREMENTED";
		} else {
			removeSessionToken(translator, response);
			response.setStatus(Response.SC_FORBIDDEN);
			return "SESSION NULLIFIED";
		}
	}
	
	private boolean sessionIdIsAuthentic(Translator translator, HttpServletRequest request) {
		Cookie sessionCookie = request.getCookies()[0];
		UUID clientSessionID = UUID.fromString(sessionCookie.getValue());
		UUID backendSessionID = UUID.fromString(translator.getSessionToken());
		return clientSessionID.equals(backendSessionID);
	}

	@DeleteMapping(value="/session")
	public Object deleteSession(HttpServletRequest request, HttpServletResponse response) {
		Translator translator = getTranslator(request);
		removeSessionToken(translator, response);
		response.setStatus(Response.SC_OK);
		return "SESSION DELETED";
	}
	
	private void removeSessionToken(Translator translator, HttpServletResponse response) {
		removeSessionToken(response);
		removeSessionToken(translator);
	}

	private void removeSessionToken(Translator translator) {
		translator.setSessionToken(null);
		translatorService.save(translator);
	}

	private void removeSessionToken(HttpServletResponse response) {
		Cookie sessionCookie = new Cookie(SESSION_COOKIE_NAME, null);
		sessionCookie.setMaxAge(0);
		sessionCookie.setHttpOnly(true);
		response.addCookie(sessionCookie);
	}
	
	private Translator getTranslator(HttpServletRequest request) {
		String username = request.getParameter("username");
		return translatorService.get(username);
	}
	
}
