const formProfissional = document.getElementById("formProfissional");
const listaProfissionais = document.getElementById("listaProfissionais");
const contadorProfissionais = document.getElementById("contadorProfissionais");
const botaoSubmitProfissional = formProfissional.querySelector("button[type='submit']");

const nomeProfissional = document.getElementById("nomeProfissional");
const especialidadeProfissional = document.getElementById("especialidadeProfissional");
const telefoneProfissional = document.getElementById("telefoneProfissional");
const emailProfissional = document.getElementById("emailProfissional");
const observacaoProfissional = document.getElementById("observacaoProfissional");

let profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
let indiceEdicaoProfissional = null;

function salvarProfissionais() {
  localStorage.setItem("profissionais", JSON.stringify(profissionais));
}

function atualizarContadorProfissionais() {
  const total = profissionais.length;
  contadorProfissionais.textContent = `${total} profissional${total !== 1 ? "is" : ""}`;
}

function limparFormularioProfissional() {
  formProfissional.reset();
  indiceEdicaoProfissional = null;
  botaoSubmitProfissional.textContent = "Salvar profissional";
}

function renderizarProfissionais() {
  listaProfissionais.innerHTML = "";

  if (profissionais.length === 0) {
    listaProfissionais.innerHTML = `
      <div class="empty-state">
        <p>Nenhum profissional cadastrado ainda.</p>
      </div>
    `;
    atualizarContadorProfissionais();
    return;
  }

  profissionais.forEach((profissional, index) => {
    const card = document.createElement("div");
    card.classList.add("professional-card");

    card.innerHTML = `
      <div class="professional-info">
        <h3>${profissional.nome}</h3>
        <p><strong>Especialidade:</strong> ${profissional.especialidade}</p>
        <p><strong>Telefone:</strong> ${profissional.telefone || "Não informado"}</p>
        <p><strong>E-mail:</strong> ${profissional.email || "Não informado"}</p>
        <p><strong>Observações:</strong> ${profissional.observacao || "Nenhuma"}</p>
      </div>

      <div class="client-actions">
        <button class="btn-edit" onclick="editarProfissional(${index})">Editar</button>
        <button class="btn-danger" onclick="excluirProfissional(${index})">Excluir</button>
      </div>
    `;

    listaProfissionais.appendChild(card);
  });

  atualizarContadorProfissionais();
}

function editarProfissional(index) {
  const profissional = profissionais[index];

  nomeProfissional.value = profissional.nome;
  especialidadeProfissional.value = profissional.especialidade;
  telefoneProfissional.value = profissional.telefone;
  emailProfissional.value = profissional.email;
  observacaoProfissional.value = profissional.observacao;

  indiceEdicaoProfissional = index;
  botaoSubmitProfissional.textContent = "Atualizar profissional";

  nomeProfissional.focus();
}

function excluirProfissional(index) {
  const confirmar = confirm("Tem certeza que deseja excluir este profissional?");
  if (!confirmar) return;

  profissionais.splice(index, 1);
  salvarProfissionais();
  renderizarProfissionais();

  if (indiceEdicaoProfissional === index) {
    limparFormularioProfissional();
  }
}

formProfissional.addEventListener("submit", function (event) {
  event.preventDefault();

  const dadosProfissional = {
    nome: nomeProfissional.value.trim(),
    especialidade: especialidadeProfissional.value.trim(),
    telefone: telefoneProfissional.value.trim(),
    email: emailProfissional.value.trim(),
    observacao: observacaoProfissional.value.trim()
  };

  if (indiceEdicaoProfissional === null) {
    profissionais.push(dadosProfissional);
  } else {
    profissionais[indiceEdicaoProfissional] = dadosProfissional;
  }

  salvarProfissionais();
  renderizarProfissionais();
  limparFormularioProfissional();
  nomeProfissional.focus();
});

renderizarProfissionais();