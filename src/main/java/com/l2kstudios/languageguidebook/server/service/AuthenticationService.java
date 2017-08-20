package com.l2kstudios.languageguidebook.server.service;

import static com.l2kstudios.languageguidebook.server.constants.SessionConstants.SESSION_COOKIE_NAME;
import static com.l2kstudios.languageguidebook.server.constants.SessionConstants.SESSION_TIME_LIMIT;

import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import com.l2kstudios.languageguidebook.server.model.Translator;

@Service
public class AuthenticationService {
	
	@Autowired
	private TranslatorService translatorService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public boolean passwordIsAuthenticated(Translator translator, String password) {
		return translator != null && bCryptPasswordEncoder.matches(password, translator.getEncryptedPassword());
	}
	
	public boolean sessionTokenIsAuthentic(Translator translator, HttpServletRequest request) {
		Cookie sessionCookie = WebUtils.getCookie(request, SESSION_COOKIE_NAME);
		UUID clientSessionID = UUID.fromString(sessionCookie.getValue());
		UUID backendSessionID = UUID.fromString(translator.getSessionToken());
		return clientSessionID.equals(backendSessionID);
	}
	
	public void incrementSessionToken(Translator translator, HttpServletResponse response) {
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
	
	public void removeSessionToken(Translator translator, HttpServletResponse response) {
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
	
}
