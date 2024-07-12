package com.alura.forumHub.domain.topic;

import jakarta.validation.constraints.NotNull;

public record TopicRegistrationData(
        @NotNull
        Long idEstudante,

        @NotNull
        String curso,

        @NotNull
        String titulo,

        @NotNull
        String mensagem
) {
}
