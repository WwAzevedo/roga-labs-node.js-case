const { Pool } = require('pg');
require('dotenv').config();


// Configurações da conexão com o banco de dados
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT, // ou a porta que você configurou para o seu banco de dados
});

module.exports = pool;