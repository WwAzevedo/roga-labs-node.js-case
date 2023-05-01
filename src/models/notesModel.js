const pool = require('../database/connection');

const notesModel = {

  // Função para obter todas as Anotações no banco de dados.
  getAllNotesModel: async () => {
    try {
      const { rows } = await pool.query('SELECT * FROM Anotação');
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar todas as anotações');
    }
  },

  // Função para buscar uma Anotação por ID no banco de dados.
  getNoteByIdModel: async (id) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Anotação WHERE id = $1', [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao buscar a anotação com o ID ${id}`);
    }
  },
  
  // Função para buscar todas as Anotações de uma determinada pessoa no banco de dados.
  getNotesByPeopleIdModel: async (id_pessoa) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Anotação WHERE id_pessoa = $1', [id_pessoa]);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao buscar todas as anotações da pessoa com o ID ${id_pessoa}`);
    }
  },

  // Função para criar uma nova Anotação no banco de dados.
  createNoteModel: async (id_pessoa, titulo, descricao, data_cadastro, data_edicao) => {
    try {
      const { rows } = await pool.query(
        'INSERT INTO Anotação (id_pessoa, titulo, descricao, data_cadastro, data_edicao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id_pessoa, titulo, descricao, data_cadastro, data_edicao]
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar nova anotação');
    }
  },

  // Função para modificar uma Anotação no banco de dados.
  updateNoteModel: async (id, titulo, descricao, data_edicao) => {
    try {
      const { rows } = await pool.query(
        'UPDATE Anotação SET  titulo = $1, descricao = $2, data_edicao = $3 WHERE id = $4 RETURNING *',
        [titulo, descricao, data_edicao, id]
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao atualizar a anotação com o ID ${id}`);
    }
  },

  // Função para deletar uma Anotação no banco de dados.
  deleteNoteModel: async (id) => {
    try {
      const { rows } = await pool.query('DELETE FROM Anotação WHERE id = $1 RETURNING *', [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao deletar a anotação com o ID ${id}`);
    }
  }
};

module.exports = notesModel;