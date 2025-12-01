// --- Elementos do DOM ---
const modal = document.getElementById('newClassModal');
const btn = document.getElementById('btnNewClass'); // Botão '+ Nova Turma'
const span = document.querySelector('#newClassModal .close'); // Botão 'X'
const cancelBtn = document.getElementById('btnCancel'); // Botão 'Cancelar' dentro do modal
const form = document.getElementById('newClassForm'); // Formulário de cadastro
const tbody = document.querySelector('.classes-table tbody'); // Corpo da tabela para adicionar novas linhas


// --- 1. Funcionalidade do Modal ---

// Função para abrir o modal
function openModal() {
    modal.style.display = 'block';
}

// Função para fechar o modal e limpar o formulário
function closeModal() {
    modal.style.display = 'none';
    form.reset(); // Limpa o formulário ao fechar
}

// Abrir modal quando o botão '+ Nova Turma' é clicado
btn.addEventListener('click', openModal);

// Fechar modal quando o 'X' é clicado
span.addEventListener('click', closeModal);

// Fechar modal quando o 'Cancelar' é clicado
cancelBtn.addEventListener('click', closeModal);

// Fechar modal quando clicar fora da área do modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});


// --- 2. Funcionalidade do Formulário e Tabela ---

// Tratar a submissão do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coleta os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 1. Remove a linha 'Nenhuma turma cadastrada' (se existir)
    // Busca a linha (tr) que contém a célula vazia com a classe 'empty'
    const emptyTd = tbody.querySelector('td.empty');
    if (emptyTd) {
        // Remove a TR inteira
        emptyTd.parentElement.remove(); 
    }

    // 2. Cria a nova linha (tr) para a tabela
    const newRow = document.createElement('tr');
    
    // Constrói o HTML da linha com os dados
    newRow.innerHTML = `
        <td>${data.identificacao}</td>
        <td>${data.curso}</td>
        <td>${data.turno}</td>
        <td>${data.ano}</td>
        <td>${data.vagasMax}</td>
        <td class="actions">
            <button class="btn-secondary small">Editar</button> 
            <button class="btn-danger small">Excluir</button>
        </td>
    `;
    
    // 3. Adiciona a nova linha ao corpo da tabela
    tbody.appendChild(newRow);

    // 4. Limpa o formulário e fecha o modal
    closeModal();

    // 5. Feedback de sucesso
    alert(`Turma ${data.identificacao} cadastrada com sucesso!`);
});