document.addEventListener('DOMContentLoaded', () => {
    const openFaltaBtns = document.querySelectorAll('.btn-add-falta');
    const openNotaBtns = document.querySelectorAll('.btn-add-nota');
    const openObsBtns = document.querySelectorAll('.btn-add-obs');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
  
    function openModal(modalId, aluno) {
      document.getElementById(modalId).style.display = 'flex';
      document.querySelector(`#${modalId} input[readonly]`).value = aluno;
    }
  
    openFaltaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const aluno = e.target.closest('.student-item').querySelector('strong').textContent;
        openModal('faltaModal', aluno);
      });
    });
  
    openNotaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const aluno = e.target.closest('.student-item').querySelector('strong').textContent;
        openModal('notaModal', aluno);
      });
    });
  
    openObsBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const aluno = e.target.closest('.student-item').querySelector('strong').textContent;
        openModal('obsModal', aluno);
      });
    });
  
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modals.forEach(modal => modal.style.display = 'none');
      });
    });
  
    window.addEventListener('click', (e) => {
      modals.forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
      });
    });
  });
   document.addEventListener('DOMContentLoaded', () => {
    // Iniciar
    document.querySelectorAll('.iniciar-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.innerText = 'Em andamento...';
            button.disabled = true;
            button.classList.remove('btn-primary');
            button.classList.add('btn-warning');
        });
    });

    // Editar
    document.querySelectorAll('.editar-btn').forEach(button => {
        button.addEventListener('click', () => {
            const atividade = button.closest('.student-item').querySelector('strong').innerText;
            const novoNome = prompt(`Editar o nome da atividade:`, atividade);
            if (novoNome) {
                button.closest('.student-item').querySelector('strong').innerText = novoNome;
                alert('Atividade atualizada!');
            }
        });
    });

    // Enviar
    document.querySelectorAll('.enviar-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Deseja realmente enviar essa atividade?')) {
                button.innerText = 'Enviado!';
                button.disabled = true;
                button.classList.remove('btn-primary');
                button.classList.add('btn-success');
            }
        });
    });
});

 // Funções para controlar as seções
 function showSection(sectionId) {
  // Esconde todas as seções
  document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
  });
  
  // Mostra a seção selecionada
  document.getElementById(sectionId + '-section').style.display = 'block';
  
  // Atualiza o menu ativo
  document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
  });
  
  // Encontra o item do menu correspondente e marca como ativo
  const menuItems = document.querySelectorAll('.nav-item');
  for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].getAttribute('onclick').includes(sectionId)) {
          menuItems[i].classList.add('active');
          break;
      }
  }
}

// Funções para controlar os modais
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Funções para salvar dados (simuladas)
function salvarNota() {
  alert('Nota salva com sucesso!');
  closeModal('nota-modal');
}

function salvarFalta() {
  alert('Falta registrada com sucesso!');
  closeModal('frequencia-modal');
}

function salvarObservacao() {
  alert('Observação salva com sucesso!');
  closeModal('observacao-modal');
}

// Funções auxiliares
function verTurma(turmaId) {
  alert('Visualizando turma: ' + turmaId);
  // Aqui você poderia carregar os detalhes da turma
}

function editarNota(alunoId) {
  alert('Editando nota do aluno ID: ' + alunoId);
  openModal('nota-modal');
}

function verFrequencia(alunoId) {
  alert('Visualizando frequência do aluno ID: ' + alunoId);
}

// Fecha o modal se clicar fora do conteúdo
window.onclick = function(event) {
  if (event.target.className === 'modal') {
      event.target.style.display = 'none';
  }
}
