const pool = require('../database/connection');

async function getAllNotes() {
  const { rows } = await pool.query('SELECT * FROM Anotação');
  return rows;
}

async function getNoteById(id) {
  const { rows } = await pool.query('SELECT * FROM Anotação WHERE id = $1', [id]);
  return rows[0];
}

async function getNotesByPeopleId(id_pessoa) {
  const { rows } = await pool.query('SELECT * FROM Anotação WHERE id_pessoa = $1', [id_pessoa]);
  return rows;
}

async function createNote(id_pessoa, titulo, descricao, data_cadastro, data_edicao) {
  const { rows } = await pool.query(
    'INSERT INTO Anotação (id_pessoa, titulo, descricao, data_cadastro, data_edicao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id_pessoa, titulo, descricao, data_cadastro, data_edicao]
  );
  return rows[0];
}

async function updateNote(id, id_pessoa, titulo, descricao, data_edicao) {
  const { rows } = await pool.query(
    'UPDATE Anotação SET id_pessoa = $1, titulo = $2, descricao = $3, data_edicao = $4 WHERE id = $5 RETURNING *',
    [id_pessoa, titulo, descricao, data_edicao, id]
  );
  return rows[0];
}

async function deleteNote(id) {
  const { rows } = await pool.query('DELETE FROM Anotação WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

module.exports = {
  getAllNotes,
  getNoteById,
  getNotesByPeopleId,
  createNote,
  updateNote,
  deleteNote,
};