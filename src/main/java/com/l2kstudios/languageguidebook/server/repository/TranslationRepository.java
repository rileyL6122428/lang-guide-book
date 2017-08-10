package com.l2kstudios.languageguidebook.server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.l2kstudios.languageguidebook.server.model.Translation;
import com.l2kstudios.languageguidebook.server.model.Translator;

public interface TranslationRepository extends CrudRepository<Translation, Long> {
	
	public List<Translation> findByOwner(Translator translator);
	
}
