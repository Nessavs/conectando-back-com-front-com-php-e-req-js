

function salvarOrcamento() {
  //Ler os valores dos inputs e carregar em variáveis
  let nome = document.getElementById('nome').value;
  let email = document.getElementById('email').value;
  let telefone = document.getElementById('telefone').value;
  let endereco = document.getElementById('endereco').value;
  let cidade = document.getElementById('cidade').value;
  let uf = document.getElementById('uf').value;
  let dataDesejada = document.getElementById('dataDesejada').value;
  let observacoes = document.getElementById('observacoes').value;

  let url;

  url = `./back/salvar_orcamento.php?id=${id}&nome=${nome}&email=${email}&telefone=${telefone}&endereco=${endereco}&cidade=${cidade}&uf=${uf}&dataDesejada=${dataDesejada}&observacoes=${observacoes}`;

  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();
  let res = JSON.parse(req.responseText);
  console.log(res);
}

function adicionarOrcamento() {
  //Limpa os inputs
  document.getElementById('id').value = '';
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('endereco').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('uf').value = '';
  document.getElementById('dataDesejada').value = '';
  document.getElementById('observacoes').value = '';

}

document.addEventListener('DOMContentLoaded', function () {
  // Adicionar um ouvinte de evento de clique ao botão de enviar
  document.getElementById('enviarContato').addEventListener('click', function () {
      salvarContato();
  });
});

function salvarContato() {
  // Ler os valores dos inputs e carregar em variáveis
  let nome = document.getElementById('nome').value;
  let email = document.getElementById('email').value;
  let mensagem = document.getElementById('mensagem').value;

  // Construir a URL para o arquivo PHP de inserção
  let url = `./back/salvar_contato.php`;

  // Construir os dados a serem enviados no corpo da requisição
  let dados = new FormData();
  dados.append('nome', nome);
  dados.append('email', email);
  dados.append('mensagem', mensagem);

  fetch(url, {
      method: 'POST',
      body: dados
  })
  .then(response => response.json())
  .then(res => {
      console.log(res);
      listarContatos(); // Opcional: chame uma função para listar os contatos
  })
  .catch(error => console.error('Erro ao salvar: ', error));
}

function adicionarContato() {
  // Limpa os inputs
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mensagem').value = '';
}

function selecionarContato(idContato) {
  let url = `./back/salvar_contato.php?idContato=${idContato}`;

  fetch(url)
      .then(response => response.json())
      .then(res => {
          console.log(res);

          // Carregando os dados de resposta nos inputs correspondentes
          document.getElementById('idContato').value = res[0].idContato;
          document.getElementById('nome').value = res[0].nome;
          document.getElementById('email').value = res[0].email;
          document.getElementById('mensagem').value = res[0].mensagem;
      })
      .catch(error => console.error('Erro ao selecionar: ', error));
}

function obterDepoimentos() {
  // Monta a url que será executada para chamar o back-end
  let url = `./back/obter_depoimentos.php`;

  // Cria a requisição http  
  let req = new XMLHttpRequest();

  // Configura a requisição
  req.open('GET', url, true);

  // Adiciona um callback para lidar com a resposta
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      // Transforma a resposta recebida do back-end em formato json
      let res = JSON.parse(req.responseText);

      // Capturar o elemento TBody da table
      let t = document.getElementById(`section4`);

      // Limpar as linhas existentes
      t.innerHTML = '';

      // Fazer um loop na lista de cidade e desenhar o html na table
      for (let i = 0; i < res.length; i++) {
        t.innerHTML += ` <!-- Primeira linha de depoimentos -->
          <div class="row">
              <!-- Depoimento ${i + 1} -->
              <div class="col-md-4 mb-4">
                  <div class="card">
                      <img src="${res[i].imagem_url}" class="card-img-top img-fluid" alt="Depoimento ${i + 1}">
                      <div class="card-body">
                          <p class="card-text">${res[i].mensagem}</p>
                          <p class="card-text"><strong>${res[i].autor}</strong></p>
                      </div>
                  </div>
              </div>`;
      }
    } else {
      console.error('Erro ao obter depoimentos. Status:', req.status);
    }
  };

  // Lida com erros de rede
  req.onerror = function () {
    console.error('Erro de rede ao obter depoimentos.');
  };

  // Executa a requisição
  req.send();
}

function salvar() {
  // Ler os valores dos inputs e carregar em variáveis
  let imagemUrl = document.getElementById('imagem_url').value;
  let autor = document.getElementById('autor').value;
  let mensagem = document.getElementById('mensagem').value;
  
  let url;
  
  // Se estiver editando, forneça o ID do depoimento
  let idDepoimento = document.getElementById('iddepoimento').value;
  
  if (idDepoimento === '') {
      url = `./back/depoimento_inserir.php?imagem_url=${imagemUrl}&autor=${autor}&mensagem=${mensagem}`;
  } else {
      url = `./back/depoimento_alterar.php?iddepoimento=${idDepoimento}&imagem_url=${imagemUrl}&autor=${autor}&mensagem=${mensagem}`;
  }
  
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();
  let res = JSON.parse(req.responseText);
  console.log(res);
  listar();
}

function salvardepoimento() {
  // Limpa os inputs
  document.getElementById('iddepoimento').value = '';
  document.getElementById('imagem_url').value = '';
  document.getElementById('autor').value = '';
  document.getElementById('mensagem').value = '';
}

function selecionar(iddepoimento) {
  let url = `./back/salvar_depoimento.php?iddepoimento=${iddepoimento}`;
  
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();
  let res = JSON.parse(req.responseText);
  console.log(res);

  // Carregando os dados de resposta nos inputs correspondentes
  document.getElementById('imagem_url').value = res[0].imagem_url;
  document.getElementById('autor').value = res[0].autor;
  document.getElementById('mensagem').value = res[0].mensagem;
}

document.addEventListener("DOMContentLoaded", function () {
  obterEExibirServicos();
});

function obterEExibirServicos() {
  // Fazer a requisição GET para obter os serviços
  fetch("./back/obter_servicos.php")
    .then(response => response.json())
    .then(servicos => exibirServicos(servicos))
    .catch(error => console.error('Erro ao obter serviços:', error));
}

function exibirServicos(servicos) {
  var servicosContainer = document.getElementById("servicos-container");

  servicos.forEach(function (servico) {
    // Convertendo servico.preco para um número antes de chamar toFixed
    var precoNumerico = parseFloat(servico.preco);

    var servicoHTML = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${servico.imagem_url}" class="card-img-top img-fluid" alt="${servico.nome}">
          <div class="card-body">
            <h5 class="card-title">${servico.nome}</h5>
            <p class="card-text">${servico.descricao}</p>
            <p class="card-text">Preço: R$${precoNumerico.toFixed(2)}</p>
            <a href="${servico.pagina_url}" class="btn btn-custom">Solicitar Orçamento</a>
          </div>
        </div>
      </div>
    `;

    servicosContainer.innerHTML += servicoHTML;
  });
}

function iniciar() {
  obterDepoimentos()
  salvardepoimento()
  salvarContato()
  exibirServicos()
}
