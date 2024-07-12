create table estudantes(
    id bigint not null auto_increment,
    usuario_id bigint not null,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    foreign key (usuario_id) references usuarios(id),

    primary key(id)
);