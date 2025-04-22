const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');


const DB_NAME = 'crud_db';
const DB_USER = 'root';
const DB_PASSWORD = 'admin';
const DB_HOST = 'localhost';


async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Banco '${DB_NAME}' verificado/criado com sucesso.`);
    await connection.end();
  } catch (error) {
    console.error('❌ Erro ao criar/verificar banco de dados:', error);
  }
}


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});


module.exports = { sequelize, createDatabase };
