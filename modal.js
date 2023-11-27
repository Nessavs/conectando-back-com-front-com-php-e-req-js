$('#exampleModal').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget); // Botão que acionou o modal
    var serviceName = button.data('whatever'); // Nome do serviço
    var modal = $(this);

    // Atualiza o título do modal com base no nome do serviço
    modal.find('.modal-title').text('Solicitar Orçamento para ' + serviceName);

    // Preenche o campo de entrada do modal com o nome do serviço
    modal.find('.modal-body input#servico').val(serviceName);
});

// Adicionando um manipulador de evento para o envio do formulário
$('#orcamentoForm').submit(function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter dados do formulário
    var nome = $('#nome').val();
    var email = $('#email').val();
    var telefone = $('#telefone').val();
    var endereco = $('#endereco').val();
    var cidade = $('#cidade').val();
    var uf = $('#uf').val();
    var dataDesejada = $('#dataDesejada').val();
    var observacoes = $('#observacoes').val();
    var servico = $('#servico').val(); // Obtemos o nome do serviço

    // Criar objeto com dados do formulário
    var formData = {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        cidade: cidade,
        uf: uf,
        dataDesejada: dataDesejada,
        observacoes: observacoes,
        servico: servico // Incluímos o nome do serviço
    };

    // Enviar requisição AJAX para o servidor PHP
    $.ajax({
        type: 'POST',
        url: 'caminho/para/salvar_orcamento.php',
        data: formData,
        success: function (response) {
            // Resposta do servidor (pode incluir mensagens de sucesso)
            console.log(response);
            // Fechar o modal após o envio bem-sucedido
            $('#exampleModal').modal('hide');
        },
        error: function (error) {
            // Tratar erros aqui, se necessário
            console.error(error);
        }
    });
});