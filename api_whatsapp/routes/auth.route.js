const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Informe o e-mail e a senha.' });
    }

    const query = 'SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?';

    db.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }

        return res.status(200).json({
            mensagem: 'Autenticação realizada com sucesso!',
            usuario: results[0]
        });
    });
});

module.exports = router;