-- create_professor.sql
CREATE DATABASE IF NOT EXISTS portal_professor;
USE portal_professor;

-- Tabela de professores
CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registro VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    disciplinas TEXT NOT NULL
);

-- Tabela de turmas
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

-- Inserir dados de exemplo
INSERT INTO professores (registro, nome, email, senha, disciplinas) VALUES 
('PROF001', 'Carlos Mendes', 'carlos@escola.com', SHA2('senha123', 256), 'Matemática,Física'),
('PROF002', 'Ana Oliveira', 'ana@escola.com', SHA2('senha123', 256), 'Português,Literatura');