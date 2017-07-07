package com.l2kstudios.languageguidebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//	@EnableJpaRepositories(basePackages = { "com.manifest.server.repository" })
	@EntityScan(basePackages = { 
		"com.l2kstudios.languageguidebook.server.controller", 
	})
public class App {
		
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
}
