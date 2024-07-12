package com.alura.forumHub.domain.topic;

public record TopicDetalingData(
        Long id,
        Long idEstudante,
        String curso,
        String titulo,
        String mensagem
) {
    public TopicDetalingData(Topic topic) {
        this(
                topic.getId(),
                topic.getEstudante().getId(),
                topic.getCurso(),
                topic.getTitulo(),
                topic.getMensagem()
        );
    }
}
