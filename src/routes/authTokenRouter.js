const express = require('express');
const router = express.Router();

// Importa os métodos "createToken" e "deleteToken" do controller "authTokenController"
const { createToken, deleteToken } = require('../controllers/authTokenController');

// Importa a função de middleware para autenticação de token
const { authToken } = require('../Middelawares/verifyAuthToken');

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Cria um novo Token.
 *     tags: [Authenticate]
 *     responses:
 *       200:
 *         description: Token criado com sucesso.
 *       500:
 *         description: Erro ao criar o Token de autenticação.
 */
router.post('/token', createToken);

/**
 * @swagger
 * /token/{key}:
 *   delete:
 *     summary: Exclui um token específico pela KEY.
 *     tags: [Authenticate]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave do token a ser excluído.
 *     responses:
 *       200:
 *         description: Token excluído com sucesso.
 *       404:
 *         description: Token não encontrado.
 */
router.delete('/token/:key', authToken, deleteToken); 

module.exports = router;