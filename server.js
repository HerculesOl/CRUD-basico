const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, createDatabase } = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));

// Rotas
app.use('/users', userRoutes);

// Inicializa
(async () => {
  await createDatabase();

  try {
    await sequelize.sync(); // Cria as tabelas se não existirem
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
})();
