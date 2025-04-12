-- create_aluno.sql
CREATE DATABASE IF NOT EXISTS portal_aluno;
USE portal_aluno;

-- Tabela de alunos
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ra VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    turma VARCHAR(50) NOT NULL
);

-- Tabela de notas
CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    nota1 DECIMAL(4,2),
    nota2 DECIMAL(4,2),
    nota3 DECIMAL(4,2),
    nota4 DECIMAL(4,2),
    media DECIMAL(4,2),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Tabela de faltas
CREATE TABLE faltas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    total INT DEFAULT 0,
    maximo INT DEFAULT 60,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Tabela de atividades
CREATE TABLE atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_entrega DATE,
    status VARCHAR(50) DEFAULT 'Pendente',
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Inserir dados de exemplo
INSERT INTO alunos (ra, nome, email, senha, turma) VALUES 
('2023001', 'João Silva', 'joao@escola.com', SHA2('senha123', 256), '3A'),
('2023002', 'Maria Souza', 'maria@escola.com', SHA2('senha123', 256), '3B');