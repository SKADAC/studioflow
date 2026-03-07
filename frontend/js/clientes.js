const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
const contadorClientes = document.getElementById("contadorClientes");
const botaoSubmit = formCliente.querySelector("button[type='submit']");

const nomeCliente = document.getElementById("nomeCliente");
const telefoneCliente = document.getElementById("telefoneCliente");
const emailCliente = document.getElementById("emailCliente");
const observacaoCliente = document.getElementById("observacaoCliente");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let indiceEdicao = null;

function salvarClientes() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

function atualizarContador() {
  const total = clientes.length;
  contadorClientes.textContent = `${total} cliente${total !== 1 ? "s" : ""}`;
}

function limparFormulario() {
  formCliente.reset();
  indiceEdicao = null;
  botaoSubmit.textContent = "Salvar cliente";
}

function renderizarClientes() {
  listaClientes.innerHTML = "";

  if (clientes.length === 0) {
    listaClientes.innerHTML = `
      <div class="empty-state">
        <p>Nenhum cliente cadastrado ainda.</p>
      </div>
    `;
    atualizarContador();
    return;
  }

  clientes.forEach((cliente, index) => {
    const card = document.createElement("div");
    card.classList.add("client-card");

    card.innerHTML = `
      <div class="client-info">
        <h3>${cliente.nome}</h3>
        <p><strong>Telefone:</strong> ${cliente.telefone}</p>
        <p><strong>E-mail:</strong> ${cliente.email || "Não informado"}</p>
        <p><strong>Observações:</strong> ${cliente.observacao || "Nenhuma"}</p>
      </div>

      <div class="client-actions">
        <button class="btn-edit" onclick="editarCliente(${index})">Editar</button>
        <button class="btn-danger" onclick="excluirCliente(${index})">Excluir</button>
      </div>
    `;

    listaClientes.appendChild(card);
  });

  atualizarContador();
}

function editarCliente(index) {
  const cliente = clientes[index];

  nomeCliente.value = cliente.nome;
  telefoneCliente.value = cliente.telefone;
  emailCliente.value = cliente.email;
  observacaoCliente.value = cliente.observacao;

  indiceEdicao = index;
  botaoSubmit.textContent = "Atualizar cliente";

  nomeCliente.focus();
}

function excluirCliente(index) {
  const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
  if (!confirmar) return;

  clientes.splice(index, 1);
  salvarClientes();
  renderizarClientes();

  if (indiceEdicao === index) {
    limparFormulario();
  }
}

formCliente.addEventListener("submit", function (event) {
  event.preventDefault();

  const dadosCliente = {
    nome: nomeCliente.value.trim(),
    telefone: telefoneCliente.value.trim(),
    email: emailCliente.value.trim(),
    observacao: observacaoCliente.value.trim()
  };

  if (indiceEdicao === null) {
    clientes.push(dadosCliente);
  } else {
    clientes[indiceEdicao] = dadosCliente;
  }

  salvarClientes();
  renderizarClientes();
  limparFormulario();
  nomeCliente.focus();
});

renderizarClientes();