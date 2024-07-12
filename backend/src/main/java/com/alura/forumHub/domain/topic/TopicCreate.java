package com.alura.forumHub.domain.topic;

import com.alura.forumHub.domain.student.StudentRepository;
import com.alura.forumHub.infra.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicCreate {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TopicRepository topicRepository;

    public TopicDetalingData criar(TopicRegistrationData dados) {
        if(!studentRepository.existsById(dados.idEstudante())){
            throw new ValidationException("Estudante não encontrado.");
        }

        var estudante = studentRepository.getReferenceById(dados.idEstudante());
        var topico = new Topic(estudante, dados.curso(), dados.titulo(), dados.mensagem());
        topicRepository.save(topico);

        return new TopicDetalingData(topico);
    }
}
