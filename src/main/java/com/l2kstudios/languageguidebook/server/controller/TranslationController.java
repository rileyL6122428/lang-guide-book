package com.l2kstudios.languageguidebook.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.l2kstudios.languageguidebook.server.model.Translation;
import com.l2kstudios.languageguidebook.server.service.TranslationService;

@RestController
public class TranslationController {

	@Autowired
	TranslationService translationService;
	
	@GetMapping(value="/translations")
	public List<Translation> getTranslations(@RequestParam String translatorName) {
		List<Translation> translations = translationService.getTranslations(translatorName);
		return translations;
	}
	
	
}
