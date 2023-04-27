const pool = require('../database/connection');

async function getAllPessoas() {
  const { rows } = await pool.query('SELECT * FROM Pessoa');
  return rows;
}

async function getPessoaById(id) {
  const { rows } = await pool.query('SELECT * FROM Pessoa WHERE id = $1', [id]);
  return rows[0];
}

async function createPessoa(nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao) {
  const { rows } = await pool.query(
    'INSERT INTO Pessoa (nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao]
  );
  return rows[0];
}

async function updatePessoa(id, nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao) {
  const { rows } = await pool.query(
    'UPDATE Pessoa SET nome = $1, nome_mae = $2, nome_pai = $3, cep = $4, data_nascimento = $5, data_edicao = $6 WHERE id = $7 RETURNING *',
    [nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao, id]
  );
  return rows[0];
}

async function deletePessoa(id) {
  const { rows } = await pool.query('DELETE FROM Pessoa WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

module.exports = {
  getAllPessoas,
  getPessoaById,
  createPessoa,
  updatePessoa,
  deletePessoa,
};