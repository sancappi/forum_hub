package com.alura.forumHub.domain.student;

import com.alura.forumHub.domain.topic.Topic;
import com.alura.forumHub.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name="estudantes")
@Entity(name="Estudante")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Student {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;

    @OneToMany(mappedBy ="estudante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> Topicos;

    @OneToOne
    @JoinColumn(name="usuario_id")
    private User usuario;

    public Student(String nome, String email, User usuario) {
        this.nome = nome;
        this.email = email;
        this.usuario = usuario;
    }
}
