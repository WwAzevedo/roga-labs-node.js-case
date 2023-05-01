const pool = require('../database/connection');

const peopleModel = {

  // Função para obter todas as Pessoas no banco de dados.
  getAllPeopleModel: async () => {
    try {
      const { rows } = await pool.query('SELECT * FROM Pessoa');
      return rows;
    } catch (error) {
      throw new Error(`Erro ao recuperar pessoas: ${error.message}`);
    }
  },

  // Função para buscar uma Pessoa por ID no banco de dados.
  getPersonByIdModel: async (id) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Pessoa WHERE id = $1', [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao recuperar pessoa por ID: ${error.message}`);
    }
  },

  // Função para criar uma nova Pessoa no banco de dados.
  createPersonModel: async (nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao) => {
    try {
      const { rows } = await pool.query(
        'INSERT INTO Pessoa (nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar pessoa: ${error.message}`);
    }
  },

  // Função para modificar uma Pessoa no banco de dados.
  updatePersonModel: async (id, nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao) => {
    try {
      const { rows } = await pool.query(
        'UPDATE Pessoa SET nome = $1, nome_mae = $2, nome_pai = $3, cep = $4, data_nascimento = $5, data_edicao = $6 WHERE id = $7 RETURNING *',
        [nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao, id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar pessoa: ${error.message}`);
    }
  },

  // Função para deletar uma Pessoa no banco de dados.
  deletePersonModel: async (id) => {
    try {
      await pool.query('DELETE FROM Anotação WHERE id_pessoa = $1', [id]);
      const { rows } = await pool.query('DELETE FROM Pessoa WHERE id = $1 RETURNING *', [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao deletar pessoa: ${error.message}`);
    }
  },
};

module.exports = peopleModel;