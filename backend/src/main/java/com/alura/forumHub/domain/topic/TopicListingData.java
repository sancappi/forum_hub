package com.alura.forumHub.domain.topic;

import java.time.LocalDateTime;

public record TopicListingData(
        Long id,
        LocalDateTime dataHoraPostagem,
        LocalDateTime dataHoraAtualizacao,
        String estudante,
        String curso,
        String titulo,
        String mensagem
) {
    public TopicListingData(Topic topic) {
        this(topic.getId(),
                topic.getDataHoraPostagem(),
                topic.getData_hora_atualizacao(),
                topic.getEstudante().getNome(),
                topic.getCurso(),
                topic.getTitulo(),
                topic.getMensagem());
    }
}
