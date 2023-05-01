const { Pool } = require('pg');
require('dotenv').config();

// Configurações da conexão com o banco de dados
const pool = new Pool({
  connectionString: process.env.PG_HOST,
});

module.exports = pool;