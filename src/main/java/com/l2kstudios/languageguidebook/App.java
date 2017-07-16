package com.l2kstudios.languageguidebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication	
	@EntityScan(basePackages = { 
		"com.l2kstudios.languageguidebook.server",
//		"com.l2kstudios.languageguidebook.server.controller", 
//		"com.l2kstudios.languageguidebook.server.model",
//		"com.l2kstudios.languageguidebook.server.repository",
//		"com.l2kstudios.languageguidebook.server.security"
	})
public class App {
		
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
}
