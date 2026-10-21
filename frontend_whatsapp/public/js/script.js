
const API_URL = 'http://localhost:3000/api/auth';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const statusMessage = document.getElementById('status-message');

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const payload = {
            email: emailInput.value,
            senha: senhaInput.value
        };

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                statusMessage.textContent = data.mensagem || 'Erro ao autenticar.';
                return;
            }

            // Armazena usuário autenticado para manter a sessão local
            localStorage.setItem('usuario_logado', JSON.stringify(data.usuario));
            statusMessage.textContent = 'Sucesso! Redirecionando...';

        } catch (error) {
            console.error('Erro na conexão:', error);
            statusMessage.textContent = 'Servidor indisponível no momento.';
        }
    });
}