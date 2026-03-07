const formServico = document.getElementById("formServico");
const listaServicos = document.getElementById("listaServicos");
const contadorServicos = document.getElementById("contadorServicos");
const botaoSubmitServico = formServico.querySelector("button[type='submit']");

const nomeServico = document.getElementById("nomeServico");
const precoServico = document.getElementById("precoServico");
const duracaoServico = document.getElementById("duracaoServico");
const descricaoServico = document.getElementById("descricaoServico");

let servicos = JSON.parse(localStorage.getItem("servicos")) || [];
let indiceEdicaoServico = null;

function salvarServicos() {
  localStorage.setItem("servicos", JSON.stringify(servicos));
}

function atualizarContadorServicos() {
  const total = servicos.length;
  contadorServicos.textContent = `${total} serviço${total !== 1 ? "s" : ""}`;
}

function limparFormularioServico() {
  formServico.reset();
  indiceEdicaoServico = null;
  botaoSubmitServico.textContent = "Salvar serviço";
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderizarServicos() {
  listaServicos.innerHTML = "";

  if (servicos.length === 0) {
    listaServicos.innerHTML = `
      <div class="empty-state">
        <p>Nenhum serviço cadastrado ainda.</p>
      </div>
    `;
    atualizarContadorServicos();
    return;
  }

  servicos.forEach((servico, index) => {
    const card = document.createElement("div");
    card.classList.add("service-card");

    card.innerHTML = `
      <div class="service-info">
        <h3>${servico.nome}</h3>
        <p><strong>Preço:</strong> ${formatarPreco(servico.preco)}</p>
        <p><strong>Duração:</strong> ${servico.duracao}</p>
        <p><strong>Descrição:</strong> ${servico.descricao || "Nenhuma"}</p>
      </div>

      <div class="client-actions">
        <button class="btn-edit" onclick="editarServico(${index})">Editar</button>
        <button class="btn-danger" onclick="excluirServico(${index})">Excluir</button>
      </div>
    `;

    listaServicos.appendChild(card);
  });

  atualizarContadorServicos();
}

function editarServico(index) {
  const servico = servicos[index];

  nomeServico.value = servico.nome;
  precoServico.value = servico.preco;
  duracaoServico.value = servico.duracao;
  descricaoServico.value = servico.descricao;

  indiceEdicaoServico = index;
  botaoSubmitServico.textContent = "Atualizar serviço";

  nomeServico.focus();
}

function excluirServico(index) {
  const confirmar = confirm("Tem certeza que deseja excluir este serviço?");
  if (!confirmar) return;

  servicos.splice(index, 1);
  salvarServicos();
  renderizarServicos();

  if (indiceEdicaoServico === index) {
    limparFormularioServico();
  }
}

formServico.addEventListener("submit", function (event) {
  event.preventDefault();

  const dadosServico = {
    nome: nomeServico.value.trim(),
    preco: precoServico.value.trim(),
    duracao: duracaoServico.value.trim(),
    descricao: descricaoServico.value.trim()
  };

  if (indiceEdicaoServico === null) {
    servicos.push(dadosServico);
  } else {
    servicos[indiceEdicaoServico] = dadosServico;
  }

  salvarServicos();
  renderizarServicos();
  limparFormularioServico();
  nomeServico.focus();
});

renderizarServicos();