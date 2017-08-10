package com.l2kstudios.languageguidebook.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.l2kstudios.languageguidebook.server.model.Translation;
import com.l2kstudios.languageguidebook.server.model.Translator;
import com.l2kstudios.languageguidebook.server.repository.TranslationRepository;
import com.l2kstudios.languageguidebook.server.repository.TranslatorRepository;

@Service
public class TranslationService {

	@Autowired
	TranslatorRepository translatorRepository;
	
	@Autowired
	TranslationRepository translationRepository;
	
	public List<Translation> getTranslations(String translatorName) {
		Translator translator = translatorRepository.findOne(translatorName);
		return translationRepository.findByOwner(translator);
	}
	
}
