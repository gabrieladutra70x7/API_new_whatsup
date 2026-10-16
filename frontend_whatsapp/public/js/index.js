const tel = document.querySelector("#tel")
const btnone = document.querySelector(".btn-1")

btnone.addEventListener("click", () => {
    console.log(tel.value)
    fetchAPI()
}) 

async function fetchAPI(){
    const URL = "http://localhost:3000/auth"
    try{

        const req = await fetch(URL, {
            method: 'POST',
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                telefone: tel.value
            })
        })

        const res= await req.json()

        if(req.ok){
                console.log(res)
        }

    }

    catch{
        console.log("A conexão falhou!")
    }
}
// Seleção dos elementos do Formulário de Registo
const nameInput = document.querySelector("#name");
const senhaInput = document.querySelector("#senha");
const telInput = document.querySelector("#tel");
const btnRegistrar = document.querySelector("#btn-registrar");

// Seleção dos elementos do Formulário de Envio de Mensagem
const destinatarioInput = document.querySelector("#destinatario");
const mensagemInput = document.querySelector("#textoMensagem");
const btnEnviar = document.querySelector("#btn-enviar");

// Event Listeners
if (btnRegistrar) {
    btnRegistrar.addEventListener("click", realizarRegistro);
}

if (btnEnviar) {
    btnEnviar.addEventListener("click", enviarMensagem);
}

/**
 * Cadastra um novo usuário no sistema
 */
async function realizarRegistro() {
    const apelido = nameInput.value.trim();
    const senha = senhaInput.value.trim();
    const telefone = telInput.value.trim();

    if (!apelido || !senha || !telefone) {
        alert('Por favor, preencha todos os campos para criar a conta.');
        return;
    }

    const dadosRegistro = {
        apelido: apelido,
        senha: senha,
        telefone: telefone
    };

    try {
        const resposta = await fetch('http://localhost:3000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosRegistro)
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert('Sucesso: ' + (dados.mensagem || 'Usuário registrado com sucesso!'));
            nameInput.value = '';
            senhaInput.value = '';
            telInput.value = '';
        } else {
            alert('Atenção: ' + (dados.mensagem || 'Falha ao registrar usuário.'));
        }
    } catch (erro) {
        console.error('Erro de comunicação:', erro);
        alert('Falha ao conectar com o servidor da API.');
    }
}

/**
 * Autentica o usuário na API
 */
async function fetchAPI() {
    const telefone = telInput.value.trim();
    const URL = "http://127.0.0.1:3000/auth";

    try {
        const req = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                telefone: telefone
            })
        });

        const res = await req.json();

        if (req.ok) {
            console.log("Autenticação efetuada com sucesso:", res);
        } else {
            console.warn("Falha na autenticação:", res);
        }
    } catch (erro) {
        console.error("A conexão falhou!", erro);
    }
}

/**
 * Envia uma mensagem via API do WhatsApp
 */
async function enviarMensagem() {
    const telefoneDestino = destinatarioInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    if (!telefoneDestino || !mensagem) {
        alert('Por favor, preencha o destinatário e a mensagem.');
        return;
    }

    // Dados de autenticação fixos para teste local
    const meuTelefone = '5518999999999';
    const minhaSenhaHash = '5f4dcc3b5aa765d61d8327deb882cf99';

    const dadosMensagem = {
        telefone: telefoneDestino,
        mensagem: mensagem
    };

    try {
        const url = `http://localhost:3000/chat?telefone=${meuTelefone}&senha_hash=${minhaSenhaHash}`;

        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosMensagem)
        });

        const dadosRetorno = await resposta.json();

        if (resposta.ok) {
            alert('Status: ' + (dadosRetorno.mensagem || 'Mensagem enviada com sucesso!'));
            mensagemInput.value = '';
        } else {
            alert('Falha: ' + (dadosRetorno.mensagem || 'Erro ao enviar mensagem.'));
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao tentar enviar a mensagem.');
    }
}