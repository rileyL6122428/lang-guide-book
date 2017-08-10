package com.l2kstudios.languageguidebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.l2kstudios.languageguidebook.server.interceptors.TestInterceptor;

@SpringBootApplication	
	@EntityScan(basePackages = { 
		"com.l2kstudios.languageguidebook.server",
	})
public class App extends WebMvcConfigurerAdapter {
		
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new TestInterceptor());
	}
	
}
