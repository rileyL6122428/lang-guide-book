package com.l2kstudios.languageguidebook.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.l2kstudios.languageguidebook.server.model.HelloWorld;

@RestController
public class HelloWorldController {
	
	@GetMapping(path = "/helloworld", produces = "application/json")
	public Object index() {
		
		return new HelloWorld();
	}
	
}
