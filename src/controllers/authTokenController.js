const { v4: uuidv4 } = require('uuid');
const { createToken, deleteToken } = require('../models/authTokenModel');

const apiTokensController = {

  // Função para criar um novo token de autenticação
  createToken: async (req, res) => {
    try {
      const token = uuidv4(); // Gera um novo token com o UUID
      const newToken = await createToken(token); // Chama a função createToken do módulo authTokenModel para salvar o token no banco de dados
      res.status(201).json(newToken);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Função para deletar um token de autenticação existente
  deleteToken: async (req, res) => {
    try {
      const deletedToken = await deleteToken(req.params.key); // Chama a função deleteToken do módulo authTokenModel para deletar o token do banco 
      if (deletedToken) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: 'Token Não Encontrado', success: false });
      }
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
    }
  }
};

module.exports = apiTokensController;