<!-- includes/config.php -->
<?php
// Configurações comuns
define('DB_HOST', 'localhost');
define('DB_ALUNO_USER', 'root');
define('DB_ALUNO_PASS', '');
define('DB_ALUNO_NAME', 'portal_aluno');

define('DB_PROFESSOR_USER', 'root');
define('DB_PROFESSOR_PASS', '');
define('DB_PROFESSOR_NAME', 'portal_professor');

// Inicia a sessão
session_start();

// Configurações de estilo
$cor_primaria = '#3498db';
$cor_secundaria = '#2c3e50';
$cor_texto = '#333';
$cor_fundo = '#f5f5f5';
?>