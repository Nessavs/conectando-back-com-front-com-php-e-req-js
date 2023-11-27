<?php

require 'banco.php';

$sql = "SELECT * FROM servicos";    

$consulta = $conexao->prepare($sql);
    
$consulta->execute();

$dados = $consulta->fetchAll(PDO::FETCH_OBJ);

header('Content-Type: application/json');

echo json_encode($dados);
?>
