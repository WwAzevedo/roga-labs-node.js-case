// middleware para adicionar a data de criação
const setCreationDate = (req, res, next) => {
    req.body.data_cadastro = new Date();
    next();
  };
  
// middleware para adicionar a data de atualização
const setUpdateDate = (req, res, next) => {
  req.body.data_edicao = new Date();
  next();
};

// middleware para impedir que o cliente insira os valores de data_cadastro ou data_edicao
const checkDateFields = (req, res, next) => {
  const { data_cadastro, data_edicao } = req.body || req._data;
  if (data_cadastro || data_edicao) {
    return res.status(400).json({ error: 'Os campos data_cadastro e data_edicao não podem ser atualizados diretamente.' });
  }
  next();
};

module.exports = {
    setCreationDate,
    setUpdateDate,
    checkDateFields,
}