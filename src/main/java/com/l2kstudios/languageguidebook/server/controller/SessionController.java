package com.l2kstudios.languageguidebook.server.controller;

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
import com.l2kstudios.languageguidebook.server.repository.TranslatorRepository;


@RestController
public class SessionController {
	
	@Autowired
	private TranslatorRepository translatorRepository;

	@PostMapping(value = "/session")
	public Object createSession(HttpServletRequest request, HttpServletResponse response) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Translator translator = translatorRepository.findOne(username);
		
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
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(); 
		
		return translator != null && 
				bCryptPasswordEncoder.matches(password, translator.getEncryptedPassword());			
	}

	private void setSessionToken(Translator translator, HttpServletResponse response) {
		UUID sessionID = UUID.randomUUID();
		saveCookieToResponse(sessionID, response);
		saveSessionIDToTranslator(sessionID, translator);
	}
	
	private void saveCookieToResponse(UUID sessionID, HttpServletResponse response) {
		Cookie sessionCookie = new Cookie("session-token", sessionID.toString());
		sessionCookie.setHttpOnly(true);
		sessionCookie.setMaxAge(1000 * 60 * 20);
		response.addCookie(sessionCookie);
	}

	private void saveSessionIDToTranslator(UUID sessionID, Translator translator) {
		translator.setSessionToken(sessionID.toString());
		translatorRepository.save(translator);
	}
	
	@GetMapping(value = "/session")
	public Object getSession(HttpServletRequest request, HttpServletResponse response) {
		String username = request.getParameter("username");
		Translator translator = translatorRepository.findOne(username);
		Cookie sessionCookie = request.getCookies()[0];
		
		UUID clientSessionID = UUID.fromString(sessionCookie.getValue());
		UUID backendSessionID = UUID.fromString(translator.getSessionToken());
		
		if(clientSessionID.equals(backendSessionID)) {
			setSessionToken(translator, response);
			response.setStatus(Response.SC_OK);
			return "SESSION INCREMENTED";
		} else {
			removeSessionToken(translator);
			removeSessionToken(response);
			response.setStatus(Response.SC_FORBIDDEN);
			return "SESSION NULLIFIED";
		}
	}

	@DeleteMapping(value="/session")
	public Object deleteSession(HttpServletRequest request, HttpServletResponse response) {
		String username = request.getParameter("username");
		Translator translator = translatorRepository.findOne(username);
		
		removeSessionToken(translator);
		removeSessionToken(response);
		
		response.setStatus(Response.SC_OK);
		return "SESSION DELETED";
	}

	private void removeSessionToken(Translator translator) {
		translator.setSessionToken(null);
		translatorRepository.save(translator);
	}

	private void removeSessionToken(HttpServletResponse response) {
		Cookie sessionCookie = new Cookie("session-token", null);
		sessionCookie.setMaxAge(0);
		sessionCookie.setHttpOnly(true);
		response.addCookie(sessionCookie);
	}
	
}
