package com.l2kstudios.languageguidebook.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.l2kstudios.languageguidebook.server.model.Translator;

public interface TranslatorRepository extends CrudRepository<Translator, String> {

}
