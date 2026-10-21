const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');

const app = express();

// Habilita comunicação cross-origin e leitura de JSON no body
app.use(cors());
app.use(express.json());

// Registro de rotas de autenticação
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
