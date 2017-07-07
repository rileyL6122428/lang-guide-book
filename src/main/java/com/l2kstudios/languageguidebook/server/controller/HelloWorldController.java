package com.l2kstudios.languageguidebook.server.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	
	@GetMapping(path = "/helloworld", produces = "application/json")
	public String index() {
		
		return "Hello world";
	}
	
}
