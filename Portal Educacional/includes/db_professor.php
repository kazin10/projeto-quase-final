<?php
include('config.php');

// Conexão com o banco do professor
$conn_professor = new mysqli(DB_HOST, DB_PROFESSOR_USER, DB_PROFESSOR_PASS, DB_PROFESSOR_NAME);

if ($conn_professor->connect_error) {
    die("Connection failed: " . $conn_professor->connect_error);
}

function getProfessorById($id) {
    global $conn_professor;
    
    $sql = "SELECT * FROM professores WHERE id = ?";
    $stmt = $conn_professor->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    return $result->fetch_assoc();
}

function getTurmasByProfessor($professor_id) {
    global $conn_professor;
    
    $sql = "SELECT * FROM turmas WHERE professor_id = ?";
    $stmt = $conn_professor->prepare($sql);
    $stmt->bind_param("i", $professor_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $turmas = array();
    while ($row = $result->fetch_assoc()) {
        $turmas[] = $row;
    }
    
    return $turmas;
}

function getAlunoByRa($ra) {
    global $conn_aluno;
    
    $sql = "SELECT id FROM alunos WHERE ra = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("s", $ra);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        return $row['id'];
    }
    
    return null;
}
?>