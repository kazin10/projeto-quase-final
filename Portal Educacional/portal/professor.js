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