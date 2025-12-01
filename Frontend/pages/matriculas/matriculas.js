// --- Elementos do DOM (mantidos) ---
const btnNewMatricula = document.getElementById('btnNewMatricula'); 
const newMatriculaModal = document.getElementById('newMatriculaModal'); 
const spanClose = document.querySelector('#newMatriculaModal .close'); 
const btnCancel = document.getElementById('btnCancel'); 
const newMatriculaForm = document.getElementById('newMatriculaForm'); 

// --- Funções de Controle do Modal (mantidas) ---
function openModal() {
    newMatriculaModal.style.display = 'block';
}

function closeModal() {
    newMatriculaModal.style.display = 'none';
    newMatriculaForm.reset(); 
}

/**
 * Lida com a submissão do formulário, coletando todos os dados.
 */
function handleSubmit(event) {
    event.preventDefault(); 
    
    // 1. Coleta dos Campos Originais
    const aluno = document.getElementById('aluno').value;
    const turma = document.getElementById('turma').value;
    const dataMatricula = document.getElementById('dataMatricula').value;

    // 2. Coleta dos NOVOS Campos
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const nomePai = document.getElementById('nomePai').value;
    const nomeMae = document.getElementById('nomeMae').value; // Marcado como REQUIRED no HTML

    // 3. Validação Simples (Garantindo que os campos marcados como * no HTML estejam preenchidos)
    if (!aluno || !cpf || !dataNascimento || !nomeMae || !turma || !dataMatricula) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
    }

    // 4. SIMULAÇÃO de Envio para o Backend (incluindo os novos dados)
    console.log('--- Dados Prontos para Envio ---');
    console.log(`Aluno: ${aluno}`);
    console.log(`CPF: ${cpf}`);
    console.log(`Nascimento: ${dataNascimento}`);
    console.log(`E-mail: ${email || 'Não informado'}`); // Exibe 'Não informado' se vazio
    console.log(`Pai: ${nomePai || 'Não informado'}`);
    console.log(`Mãe: ${nomeMae}`);
    console.log(`Turma: ${turma}`);
    console.log(`Data Matrícula: ${dataMatricula}`);
    
    alert(`Matrícula de ${aluno} pronta para ser salva (SIMULADO)!`);
    
    // 5. Fecha o modal
    closeModal();
}


// --- Adicionar Escutadores de Evento (mantidos) ---
btnNewMatricula.addEventListener('click', openModal);
spanClose.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
    if (event.target === newMatriculaModal) {
        closeModal();
    }
});
newMatriculaForm.addEventListener('submit', handleSubmit);