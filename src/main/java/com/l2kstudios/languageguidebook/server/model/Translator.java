package com.l2kstudios.languageguidebook.server.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Translator {
	
	@Id
	private String name;
	private String encryptedPassword;
	private String sessionToken;
	
	@OneToMany(mappedBy="owner", cascade = CascadeType.ALL, fetch=FetchType.LAZY)
	private List<Translation> works;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEncryptedPassword() {
		return encryptedPassword;
	}
	public void setEncryptedPassword(String encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
	}
	public String getSessionToken() {
		return sessionToken;
	}
	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}
	public List<Translation> getWorks() {
		return works;
	}
	public void setWorks(List<Translation> works) {
		this.works = works;
	}
	
}
