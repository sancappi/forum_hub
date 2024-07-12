package com.alura.forumHub.domain.student;

public record StudentDetalingData(Long id, String nome, String email) {
    public StudentDetalingData(Student student) {
        this(student.getId(), student.getNome(), student.getEmail());
    }
}
