const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Listar todos os usuários
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Criar um novo usuário
router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  const newUser = await User.create({ nome, email });
  res.json(newUser);
});

// Atualizar um usuário
router.put('/:id', async (req, res) => {
  const { nome, email } = req.body;
  await User.update({ nome, email }, { where: { id: req.params.id } });
  res.sendStatus(200);
});

// Excluir um usuário
router.delete('/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
