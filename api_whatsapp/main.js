//libs necessárias
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth.route.js');

//executamos as funções
const app = express();

app.use(cors({
    origin: '*', // Permite que qualquer origem acesse localmente para testes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Permite ler dados em JSON enviados pelo frontend
app.use(express.static('public')); // Serve os ficheiros estáticos (index.html, style.css, etc.)
app.use(authRoute); // Associa as rotas de autenticação/registro

const PORT = 3000;
const SERVER = "localhost";
const msg = `Servidor Online em http://${SERVER}:${PORT}`;
app.listen(PORT, () => console.log(msg));

