<?php
include('config.php');

function isLoggedIn() {
    return isset($_SESSION['aluno_id']);
}

function isProfessorLoggedIn() {
    return isset($_SESSION['professor_id']);
}

function loginAluno($email, $senha) {
    global $conn_aluno;
    
    $sql = "SELECT id FROM alunos WHERE email = ? AND senha = SHA2(?, 256)";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("ss", $email, $senha);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $_SESSION['aluno_id'] = $row['id'];
        return true;
    }
    
    return false;
}

function loginProfessor($email, $senha) {
    global $conn_professor;
    
    $sql = "SELECT id FROM professores WHERE email = ? AND senha = SHA2(?, 256)";
    $stmt = $conn_professor->prepare($sql);
    $stmt->bind_param("ss", $email, $senha);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $_SESSION['professor_id'] = $row['id'];
        return true;
    }
    
    return false;
}

function logout() {
    session_destroy();
    header('Location: index.php');
    exit();
}
?>