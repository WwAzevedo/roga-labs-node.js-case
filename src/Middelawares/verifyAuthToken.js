// array de chaves válidas
const validKeys = [''];

// middleware para verificar a chave de autenticação
const authenticate = (req, res, next) => {
  const key = req.headers['x-api-key']; // extrai a chave do header

  if (validKeys.includes(key)) { // verifica se a chave é válida
    next();
  } else {
    res.status(401).send('Unauthorized'); // retorna status 401 se a chave não for válida
  }
}