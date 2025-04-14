// Dados de usuários fictícios (substitua por conexão real com banco de dados)
const usuarios = {
    alunos: [
      { id: 1, ra: '2023001', nome: 'João Silva', email: 'joao@escola.com', senha: 'senha123', turma: '3A' },
      { id: 2, ra: '2023002', nome: 'Maria Souza', email: 'maria@escola.com', senha: 'senha123', turma: '3B' }
    ],
    professores: [
      { id: 1, registro: 'PROF001', nome: 'Carlos Mendes', email: 'carlos@escola.com', senha: 'senha123', disciplinas: 'Matemática,Física' },
      { id: 2, registro: 'PROF002', nome: 'Ana Oliveira', email: 'ana@escola.com', senha: 'senha123', disciplinas: 'Português,Literatura' }
    ]
  };
  
  // Elementos da página de seleção
  const portalSelect = document.getElementById('portal-select');
  const loginForm = document.getElementById('login-form');
  const portalTitle = document.getElementById('portal-title');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const loginBtn = document.getElementById('login-btn');
  const messageDiv = document.getElementById('message');
  
  // Mudar o formulário conforme o portal selecionado
  portalSelect.addEventListener('change', function() {
    const portal = this.value;
    
    if (portal === 'aluno') {
      portalTitle.textContent = 'Portal do Aluno - Login';
      loginBtn.textContent = 'Acessar como Aluno';
    } else if (portal === 'professor') {
      portalTitle.textContent = 'Portal do Professor - Login';
      loginBtn.textContent = 'Acessar como Professor';
    }
    
    // Limpar campos
    emailInput.value = '';
    senhaInput.value = '';
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  });
  
  // Processar login
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const portal = portalSelect.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    
    // Validar campos
    if (!email || !senha) {
      showMessage('Por favor, preencha todos os campos', 'error');
      return;
    }
    
    // Verificar credenciais
    const usuario = autenticarUsuario(portal, email, senha);
    
    if (usuario) {
      showMessage('Login bem-sucedido! Redirecionando...', 'success');
      
      // Simular redirecionamento (substitua pelo real)
      setTimeout(() => {
        if (portal === 'aluno') {
          window.location.href = '../aluno/dashboard.html';
          // Armazenar dados do aluno na sessionStorage
          sessionStorage.setItem('aluno', JSON.stringify(usuario));
        } else {
          window.location.href = '../professor/dashboard.html';
          // Armazenar dados do professor na sessionStorage
          sessionStorage.setItem('professor', JSON.stringify(usuario));
        }
      }, 1500);
    } else {
      showMessage('Email ou senha incorretos', 'error');
    }
  });
  
  // Função de autenticação
  function autenticarUsuario(portal, email, senha) {
    const listaUsuarios = portal === 'aluno' ? usuarios.alunos : usuarios.professores;
    return listaUsuarios.find(user => user.email === email && user.senha === senha);
  }
  
  // Mostrar mensagens
  function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
  }
  
  // Verificar se já está logado (páginas internas)
  function checkAuth(requiredPortal) {
    const userData = sessionStorage.getItem(requiredPortal);
    
    if (!userData) {
      window.location.href = '../index.html';
    }
    
    return JSON.parse(userData);
  }

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
function enviarJustificativa() {
    alert('Justificativa enviada com sucesso!');
    closeModal('justificar-falta-modal');
}

function enviarMensagem() {
    alert('Mensagem enviada com sucesso!');
    closeModal('nova-mensagem-modal');
}

function gerarBoletim() {
    alert('Boletim gerado com sucesso!');
    closeModal('boletim-modal');
}

// Fecha o modal se clicar fora do conteúdo
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
} 
