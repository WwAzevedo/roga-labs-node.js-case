const pool = require('../database/connection');

async function getAllAnotacoes() {
  const { rows } = await pool.query('SELECT * FROM anotacoes');
  return rows;
}

async function getAnotacaoById(id) {
  const { rows } = await pool.query('SELECT * FROM anotacoes WHERE id = $1', [id]);
  return rows[0];
}

async function getAnotacoesByPessoaId(idPessoa) {
  const { rows } = await pool.query('SELECT * FROM anotacoes WHERE id_pessoa = $1', [idPessoa]);
  return rows;
}

async function createAnotacao(idPessoa, titulo, descricao, dataCadastro, dataEdicao) {
  const { rows } = await pool.query(
    'INSERT INTO anotacoes (id_pessoa, titulo, descricao, data_cadastro, data_edicao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [idPessoa, titulo, descricao, dataCadastro, dataEdicao]
  );
  return rows[0];
}

async function updateAnotacao(id, idPessoa, titulo, descricao, dataEdicao) {
  const { rows } = await pool.query(
    'UPDATE anotacoes SET id_pessoa = $1, titulo = $2, descricao = $3, data_edicao = $4 WHERE id = $5 RETURNING *',
    [idPessoa, titulo, descricao, dataEdicao, id]
  );
  return rows[0];
}

async function deleteAnotacao(id) {
  const { rows } = await pool.query('DELETE FROM anotacoes WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

module.exports = {
  getAllAnotacoes,
  getAnotacaoById,
  getAnotacoesByPessoaId,
  createAnotacao,
  updateAnotacao,
  deleteAnotacao,
};