package com.alura.forumHub.controller;

import com.alura.forumHub.domain.student.StudentRegistrationData;
import com.alura.forumHub.domain.student.StudentDetalingData;
import com.alura.forumHub.domain.student.Student;
import com.alura.forumHub.domain.student.StudentRepository;
import com.alura.forumHub.domain.user.User;
import com.alura.forumHub.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder codificar = new BCryptPasswordEncoder();

    @PostMapping("/register")
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid StudentRegistrationData dados, UriComponentsBuilder uriComponentsBuilder) {

        User usuario = new User(dados.email(), codificar.encode(dados.senha()));
        userRepository.save(usuario);

        var estudante = new Student(dados.nome(), dados.email(), usuario);
        studentRepository.save(estudante);

        var uri = uriComponentsBuilder.path("/students/{id}").buildAndExpand(estudante.getId()).toUri();
        return ResponseEntity.created(uri).body(new StudentDetalingData(estudante));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        studentRepository.deleteById((id));
        return ResponseEntity.noContent().build();
    }
}
