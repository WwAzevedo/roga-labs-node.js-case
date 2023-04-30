const { getTokenByKey } = require('../models/authTokenModel');

// Define o middleware "authToken", que verifica se o token enviado no header da requisição é válido
const authToken = async (req, res, next) => {
  try {
    const key = req.headers['token']; // Obtém o token enviado no header da requisição
    const validKeys = await getTokenByKey(key); // Chama a função "getTokenByKey" para verificar se o token é válido

    // Se o token for válido, chama a próxima função de middleware na cadeia
    if (validKeys) {
      next();
    } else {
      res.status(403).json({ error: 'Usuário não autorizado' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: 'Erro interno na verificação do token de autenticação' });
  }
}

module.exports = {
  authToken,
}
