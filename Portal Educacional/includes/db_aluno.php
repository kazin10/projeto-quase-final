<?php
include('config.php');

// Conexão com o banco do aluno
$conn_aluno = new mysqli(DB_HOST, DB_ALUNO_USER, DB_ALUNO_PASS, DB_ALUNO_NAME);

if ($conn_aluno->connect_error) {
    die("Connection failed: " . $conn_aluno->connect_error);
}

function getAlunoById($id) {
    global $conn_aluno;
    
    $sql = "SELECT * FROM alunos WHERE id = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    return $result->fetch_assoc();
}

function getNotasByAluno($aluno_id) {
    global $conn_aluno;
    
    $sql = "SELECT * FROM notas WHERE aluno_id = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("i", $aluno_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $notas = array();
    while ($row = $result->fetch_assoc()) {
        $notas[] = $row;
    }
    
    return $notas;
}

function getFaltasByAluno($aluno_id) {
    global $conn_aluno;
    
    $sql = "SELECT * FROM faltas WHERE aluno_id = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("i", $aluno_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $faltas = array();
    while ($row = $result->fetch_assoc()) {
        $faltas[] = $row;
    }
    
    return $faltas;
}

function getAtividadesByAluno($aluno_id) {
    global $conn_aluno;
    
    $sql = "SELECT * FROM atividades WHERE aluno_id = ? ORDER BY data_entrega";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("i", $aluno_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $atividades = array();
    while ($row = $result->fetch_assoc()) {
        $atividades[] = $row;
    }
    
    return $atividades;
}

// Funções para o professor enviar dados
function enviarNota($aluno_id, $disciplina, $bimestre, $nota) {
    global $conn_aluno;
    
    // Verifica se já existe registro para essa disciplina
    $sql = "SELECT * FROM notas WHERE aluno_id = ? AND disciplina = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("is", $aluno_id, $disciplina);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Atualiza nota existente
        $sql = "UPDATE notas SET nota$bimestre = ? WHERE aluno_id = ? AND disciplina = ?";
        $stmt = $conn_aluno->prepare($sql);
        $stmt->bind_param("dis", $nota, $aluno_id, $disciplina);
    } else {
        // Insere nova nota
        $sql = "INSERT INTO notas (aluno_id, disciplina, nota$bimestre) VALUES (?, ?, ?)";
        $stmt = $conn_aluno->prepare($sql);
        $stmt->bind_param("isd", $aluno_id, $disciplina, $nota);
    }
    
    if ($stmt->execute()) {
        // Atualiza média
        atualizarMedia($aluno_id, $disciplina);
        return true;
    }
    
    return false;
}

function atualizarMedia($aluno_id, $disciplina) {
    global $conn_aluno;
    
    $sql = "SELECT nota1, nota2, nota3, nota4 FROM notas WHERE aluno_id = ? AND disciplina = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("is", $aluno_id, $disciplina);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    $soma = 0;
    $contador = 0;
    
    for ($i = 1; $i <= 4; $i++) {
        if (!is_null($row["nota$i"])) {
            $soma += $row["nota$i"];
            $contador++;
        }
    }
    
    $media = ($contador > 0) ? $soma / $contador : null;
    
    $sql = "UPDATE notas SET media = ? WHERE aluno_id = ? AND disciplina = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("dis", $media, $aluno_id, $disciplina);
    $stmt->execute();
}

function enviarFalta($aluno_id, $disciplina, $quantidade) {
    global $conn_aluno;
    
    // Verifica se já existe registro para essa disciplina
    $sql = "SELECT * FROM faltas WHERE aluno_id = ? AND disciplina = ?";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("is", $aluno_id, $disciplina);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Atualiza faltas existentes
        $sql = "UPDATE faltas SET total = total + ? WHERE aluno_id = ? AND disciplina = ?";
        $stmt = $conn_aluno->prepare($sql);
        $stmt->bind_param("iis", $quantidade, $aluno_id, $disciplina);
    } else {
        // Insere novas faltas
        $sql = "INSERT INTO faltas (aluno_id, disciplina, total) VALUES (?, ?, ?)";
        $stmt = $conn_aluno->prepare($sql);
        $stmt->bind_param("isi", $aluno_id, $disciplina, $quantidade);
    }
    
    return $stmt->execute();
}

function enviarAtividade($aluno_id, $disciplina, $titulo, $descricao, $data_entrega) {
    global $conn_aluno;
    
    $sql = "INSERT INTO atividades (aluno_id, disciplina, titulo, descricao, data_entrega) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn_aluno->prepare($sql);
    $stmt->bind_param("issss", $aluno_id, $disciplina, $titulo, $descricao, $data_entrega);
    
    return $stmt->execute();
}
?>