const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Criar usuário
router.post('/users', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const user = await User.create({ nome, email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar usuário
router.put('/users/:id', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.nome = nome;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar usuário
router.delete('/users/:id', async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.params.id } });
    if (result) {
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
