package com.alura.forumHub.controller;

import com.alura.forumHub.domain.topic.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicCreate criacao;

    @PostMapping
    @Transactional
    public ResponseEntity registrarTopico(@RequestBody @Valid TopicRegistrationData dados){
        var novoTopico = criacao.criar(dados);
        return ResponseEntity.ok(novoTopico);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid TopicUpdateData dados) {
        var topico = topicRepository.getReferenceById(dados.id());
        topico.atualizarInformacoes(dados);
        return ResponseEntity.ok(new TopicDetalingData(topico));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        topicRepository.deleteById((id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<TopicListingData> listar() {
        return topicRepository.findAll().stream()
                .map(TopicListingData::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity detalhar(@PathVariable Long id) {
        var topico = topicRepository.getReferenceById(id);
        return ResponseEntity.ok(new TopicDetalingData(topico));
    }
}
