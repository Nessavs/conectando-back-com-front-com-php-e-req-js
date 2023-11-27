<?php
// Conectar com o banco de dados
require 'banco.php';

// Recuperar os dados do formulário
$imagem_url = $_POST['imagem_url'] ?? '';
$autor = $_POST['autor'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';

// Inserir os dados no banco
$sql = "INSERT INTO depoimentos (imagem_url, autor, mensagem) VALUES (:imagem_url, :autor, :mensagem)";
$consulta = $conexao->prepare($sql);
$consulta->bindParam(':imagem_url', $imagem_url, PDO::PARAM_STR);
$consulta->bindParam(':autor', $autor, PDO::PARAM_STR);
$consulta->bindParam(':mensagem', $mensagem, PDO::PARAM_STR);
$consulta->execute();

// Retornar algum feedback (pode ser um JSON, mensagem, etc.)
echo json_encode(['status' => 'success', 'message' => 'Depoimento inserido com sucesso.']);

// Redirecionar para index.html
header('Location: /penteadospt2/index.html ');
exit(); // Certifique-se de chamar exit() após o redirecionamento para evitar a execução adicional do script
?>

