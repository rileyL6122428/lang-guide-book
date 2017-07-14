package com.l2kstudios.languageguidebook.server.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.l2kstudios.languageguidebook.server.model.Session;

@RestController
public class SessionController {

	@PostMapping(value = "/session")
	public Session createSession(HttpServletRequest request) {
		request.getParameter("username");
		
		return null;
	}
	
}
