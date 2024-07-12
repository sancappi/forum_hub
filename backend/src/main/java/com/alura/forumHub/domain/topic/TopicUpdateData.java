package com.alura.forumHub.domain.topic;

import jakarta.validation.constraints.NotNull;

public record TopicUpdateData(
        @NotNull
        Long id,
        String mensagem
) {
}
