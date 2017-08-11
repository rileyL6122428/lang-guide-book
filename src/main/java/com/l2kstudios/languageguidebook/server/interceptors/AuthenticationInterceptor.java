package com.l2kstudios.languageguidebook.server.interceptors;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.l2kstudios.languageguidebook.server.model.Translator;
import com.l2kstudios.languageguidebook.server.service.AuthenticationService;
import com.l2kstudios.languageguidebook.server.service.TranslatorService;

@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired 
	private TranslatorService translatorService;
	
	@Autowired 
	private AuthenticationService authenticationService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		Translator translator = translatorService.get(request.getParameter("username")); 
		
		if(authenticationService.sessionTokenIsAuthentic(translator, request)) {
			authenticationService.incrementSessionToken(translator, response);
			return true;
			
		} else {
			return false;
		}
	}

}
