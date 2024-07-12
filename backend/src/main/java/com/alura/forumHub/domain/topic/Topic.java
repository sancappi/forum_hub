package com.alura.forumHub.domain.topic;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.alura.forumHub.domain.student.Student;

import java.time.LocalDateTime;

@Table(name="topicos")
@Entity(name="Topico")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Topic {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="estudante_id")
    private Student estudante;

    @NotNull
    private String curso;

    @NotNull
    private String titulo;

    @NotNull
    private String mensagem;

    private LocalDateTime dataHoraPostagem = LocalDateTime.now();

    private LocalDateTime data_hora_atualizacao;


    public Topic(Student estudante, String curso, String titulo, String mensagem) {
        this.estudante = estudante;
        this.curso = curso;
        this.titulo = titulo;
        this.mensagem = mensagem;
    }

    public void atualizarInformacoes(TopicUpdateData dados) {
        if(dados.mensagem() != null) {
            this.mensagem = dados.mensagem();
            this.data_hora_atualizacao = LocalDateTime.now();
        }
    }
}
