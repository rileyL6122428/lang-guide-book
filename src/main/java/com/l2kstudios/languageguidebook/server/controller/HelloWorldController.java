package com.l2kstudios.languageguidebook.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.l2kstudios.languageguidebook.server.model.HelloWorld;

@RestController
public class HelloWorldController {
	
	@GetMapping(path = "/helloworld", produces = "application/json")
	public Object index() {
		
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String encodedHelloWorld1 = bCryptPasswordEncoder.encode("password");
		String encodedHelloWorld2 = bCryptPasswordEncoder.encode("Hello World");
		
		bCryptPasswordEncoder.matches("Hello World", encodedHelloWorld1);
		bCryptPasswordEncoder.matches("Hello World", encodedHelloWorld2);
		bCryptPasswordEncoder.matches("Hello Worldd", encodedHelloWorld2);
		
		
		return new HelloWorld();
	}
	
	
	
}
