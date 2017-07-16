package com.l2kstudios.languageguidebook.server.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.l2kstudios.languageguidebook.server.model.Translator;
import com.l2kstudios.languageguidebook.server.repository.TranslatorRepository;

@RestController
public class TestController {
	
	@Autowired
	private TranslatorRepository translatorRepository;

	@GetMapping(path="test/users", produces="application/json")
	public Iterable<Translator> testUsers() {
		return translatorRepository.findAll();
	}
	
	@GetMapping(path="test/cookie", produces="application/json")
	public String testCookie(HttpServletResponse response) {
		Cookie cookie = new Cookie("test-cookie", "test-value");
		cookie.setHttpOnly(true);
//		cookie.setSecure(true); 
		cookie.setMaxAge(1000 * 60 * 60 * 24);
		response.addCookie(cookie);
		
		
		return "Cookie sent";
	}
}
