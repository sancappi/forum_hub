create table topicos(
    id bigint not null auto_increment,
    estudante_id bigint not null,
    curso varchar(100) not null,
    titulo varchar(100) not null,
    mensagem text not null,
    data_hora_postagem timestamp not null,
    data_hora_atualizacao timestamp null,
    foreign key (estudante_id) references estudantes(id),

    primary key(id)
)