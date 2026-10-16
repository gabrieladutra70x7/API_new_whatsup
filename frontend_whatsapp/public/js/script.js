
const form = document.querySelector('#form-registro');
const inputNome = document.querySelector('#nome');
const inputTelefone = document.querySelector('#telefone');
const inputSenha = document.querySelector('#senha');
const divMensagem = document.querySelector('#mensagem');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dados = {
    nome: inputNome.value.trim(),
    telefone: inputTelefone.value.trim(),
    senha: inputSenha.value.trim()
  };

  try {
   const resposta = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      divMensagem.textContent = resultado.mensagem;
      divMensagem.style.color = 'green';
      form.reset();
    } else {
      divMensagem.textContent = resultado.erro;
      divMensagem.style.color = 'red';
    }
  } catch (erro) {
    console.error('Erro na requisição:', erro);
    divMensagem.textContent = 'Erro de conexão com o servidor.';
    divMensagem.style.color = 'red';
  }
});