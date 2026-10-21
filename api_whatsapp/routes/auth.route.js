const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Ajuste o caminho até à conexão do seu banco

// Endpoint sugerido para registrar nova conta (POST /registrar ou POST /signin)
router.post('/registrar', (req, res) => {
  const { nome, telefone, senha } = req.body;

  // 1. Validação simples dos dados recebidos
  if (!nome || !telefone || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios!' });
  }

  // 2. Query de inserção no MySQL
  const querySql = 'INSERT INTO utilizadores (nome, telefone, senha) VALUES (?, ?, ?)';

  db.query(querySql, [nome, telefone, senha], (err, result) => {
    if (err) {
      console.error('Erro no Banco de Dados:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ erro: 'Este número de telefone já está registrado.' });
      }
      return res.status(500).json({ erro: 'Erro ao salvar no banco de dados.' });
    }

    // 3. Resposta de sucesso
    return res.status(201).json({
      mensagem: 'Conta criada com sucesso!',
      id: result.insertId
    });
  });
});

module.exports = router;