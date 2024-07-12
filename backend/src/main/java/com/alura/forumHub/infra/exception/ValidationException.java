package com.alura.forumHub.infra.exception;

public class ValidationException extends RuntimeException{
    public ValidationException(String mensagem) {
        super(mensagem);
    }
}
