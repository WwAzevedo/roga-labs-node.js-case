const pool = require('../database/connection');

const authTokenModel = {

  // Função para obter um token a partir de sua chave.
  getTokenByKey: async (key) => {
    try {
      const { rows } = await pool.query('SELECT * FROM api_tokens WHERE token = $1', [key]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao criar token`);
    }
  },

  // Função para criar um novo token no banco de dados.
  createToken: async (key) => {
    try {
      const { rows } = await pool.query('INSERT INTO api_tokens (token) VALUES ($1) RETURNING *', [key]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Função para deletar um token existente no banco de dados.
  deleteToken: async (key) => {
    try {
      const { rows } = await pool.query('DELETE FROM api_tokens WHERE token = $1 RETURNING *', [key]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao deletar token ${key}`);
    }
  },
};

module.exports = authTokenModel;