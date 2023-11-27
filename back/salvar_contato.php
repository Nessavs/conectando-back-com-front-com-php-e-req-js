<?php
// salvar_contato.php

// Incluir arquivo de conexão com o banco de dados
require 'banco.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obter os valores do POST
    $nome = isset($_POST["nome"]) ? $_POST["nome"] : null;
    $email = isset($_POST["email"]) ? $_POST["email"] : null;
    $mensagem = isset($_POST["mensagem"]) ? $_POST["mensagem"] : null;

    // Se os valores não são nulos, realizar a inserção
    if ($nome !== null && $email !== null && $mensagem !== null) {
        try {
            // Preparar e executar a consulta SQL
            $sqlInsert = "INSERT INTO contatos (nome, email, mensagem) VALUES (:nome, :email, :mensagem)";

            $consulta = $conexao->prepare($sqlInsert);
            $consulta->bindParam(':nome', $nome, PDO::PARAM_STR);
            $consulta->bindParam(':email', $email, PDO::PARAM_STR);
            $consulta->bindParam(':mensagem', $mensagem, PDO::PARAM_STR);

            $consulta->execute();
            $linhas = $consulta->rowCount();

            // Retornar algum feedback (pode ser um JSON, mensagem, etc.)
            echo json_encode(['status' => 'success', 'message' => 'Contato salvo com sucesso.']);
        } catch (PDOException $e) {
            // Em caso de erro, retornar mensagem de erro
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Valores de nome, email ou mensagem estão faltando.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);
}
// Redirecionar para index.html
header('Location: /penteadospt2/index.html ');
exit(); // Certifique-se de chamar exit() após o redirecionamento para evitar a execução adicional do script
?>