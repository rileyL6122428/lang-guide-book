package com.l2kstudios.languageguidebook.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.l2kstudios.languageguidebook.server.model.Translator;
import com.l2kstudios.languageguidebook.server.repository.TranslatorRepository;

@Service
public class TranslatorService {

	@Autowired
	private TranslatorRepository translatorRepository;
	
	public Translator get(String name) {
		return translatorRepository.findOne(name);
	}
	
	public void save(Translator translator) {
		translatorRepository.save(translator);
	}
}
