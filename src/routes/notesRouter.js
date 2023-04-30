const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, getNotesByPeopleId, createNote, updateNote, deleteNote } = require('../controllers/notesController');
const { setCreationDate, setUpdateDate, checkDateFields } = require('../Middelawares/datetimeMiddelawares')

// Importa a função de middleware para autenticação de token
const { authToken } = require('../Middelawares/verifyAuthToken');

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retorna todas as anotações.
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as anotações.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 id_pessoa: 1
 *                 titulo: Anotação 1
 *                 descricao: Descrição da anotação 1
 *                 data_cadastro: 2023-04-28T03:00:00.000Z
 *                 data_edicao: 2023-04-28T03:00:00.000Z
 *               - id: 2
 *                 id_pessoa: 1
 *                 titulo: Anotação 2
 *                 descricao: Descrição da anotação 2
 *                 data_cadastro: 2023-04-28T03:00:00.000Z
 *                 data_edicao: 2023-04-28T03:00:00.000Z
 *               - id: 3
 *                 id_pessoa: 2
 *                 titulo: Anotação 3
 *                 descricao: Descrição da anotação 3
 *                 data_cadastro: 2023-04-28T03:00:00.000Z
 *                 data_edicao: 2023-04-28T03:00:00.000Z
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/notes', authToken, getAllNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Retorna uma anotação específica pelo ID.
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID da anotação.
 *     responses:
 *       200:
 *         description: Anotação encontrada.
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               id_pessoa: 2
 *               titulo: Anotação 3
 *               descricao: Descrição da anotação 3
 *               data_cadastro: 2023-04-28T03:00:00.000Z
 *               data_edicao: 2023-04-28T03:00:00.000Z
 *       404:
 *         description: Anotação não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/notes/:id', authToken, getNoteById); 

/**
 * @swagger
 * /notes/people/{id}:
 *   get:
 *     summary: Retorna todas as anotações associadas a uma pessoa pelo ID da pessoa.
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID da pessoa.
 *     responses:
 *       200:
 *         description: Lista de todas as anotações associadas à pessoa encontrada.
 *         content:
 *           application/json:
 *             example:
 *               - id: 3
 *                 id_pessoa: 2
 *                 titulo: Anotação 3
 *                 descricao: Descrição da anotação 3
 *                 data_cadastro: 2023-04-28T03:00:00.000Z
 *                 data_edicao: 2023-04-28T03:00:00.000Z
 *               - id: 4
 *                 id_pessoa: 2
 *                 titulo: Anotação 4
 *                 descricao: Descrição da anotação 4
 *                 data_cadastro: 2023-04-28T03:00:00.000Z
 *                 data_edicao: 2023-04-28T03:00:00.000Z
 *       404:
 *         description: Pessoa não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/notes/people/:id', authToken, getNotesByPeopleId); //Rota para obter todas as anotações associadas a uma pessoa pelo ID da pessoa

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Cria uma nova anotação.
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pessoa
 *               - titulo
 *               - descricao
 *               - data_cadastro
 *               - data_edicao
 *             properties:
 *               id_pessoa:
 *                 type: integer
 *                 description: ID da pessoa associada à anotação
 *               titulo:
 *                 type: string
 *                 description: Título da anotação
 *               descricao:
 *                 type: Descrição da anotação
 *             example:
 *               id_pessoa: 1
 *               titulo: "Minha primeira anotação"
 *               descricao: "Esta é a minha primeira anotação"
 *     responses:
 *       '201':
 *         description: Anotação atualizada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               id_pessoa: 1
 *               titulo: "Minha primeira anotação atualizada"
 *               descricao: "Esta é a minha primeira anotação atualizada"
 *               data_cadastro: "2023-04-30T12:00:00Z"
 *               data_edicao: "2023-04-30T13:00:00Z"
 *       '400':
 *         description: Dados inválidos para criação da anotação.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post('/notes', authToken, checkDateFields, setCreationDate, setUpdateDate, createNote); //Rota para criar uma nova anotação, com a aplicação de middlewares para definir as datas de criação e atualização automaticamente

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Atualiza uma anotação existente.
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     description: Rota para atualizar uma anotação existente, com a aplicação de middlewares para definir a data de atualização automaticamente.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da anotação a ser atualizada.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados da anotação a ser atualizada.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pessoa
 *               - titulo
 *               - descricao
 *               - data_edicao
 *             properties:
 *               id_pessoa:
 *                 type: integer
 *                 description: ID da pessoa associada à anotação.
 *               titulo:
 *                 type: string
 *                 description: Título da anotação.
 *               descricao:
 *                 type: string
 *                 description: Descrição da anotação.
 *             example:
 *               titulo: "Minha primeira anotação atualizada"
 *               descricao: "Esta é a minha primeira anotação atualizada"
 *     responses:
 *       '200':
 *         description: Anotação atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da anotação.
 *                 id_pessoa:
 *                   type: integer
 *                   description: ID da pessoa associada à anotação.
 *                 titulo:
 *                   type: string
 *                   description: Título da anotação.
 *                 descricao:
 *                   type: string
 *                   description: Descrição da anotação.
 *                 data_cadastro:
 *                   type: string
 *                   format: date-time
 *                   description: Data de cadastro da anotação (formato ISO 8601).
 *                 data_edicao:
 *                   type: string
 *                   format: date-time
 *                   description: Data de edição da anotação (formato ISO 8601).
 *             example:
 *               id: 1
 *               id_pessoa: 1
 *               titulo: "Minha primeira anotação atualizada"
 *               descricao: "Esta é a minha primeira anotação atualizada"
 *               data_cadastro: "2023-04-30T12:00:00Z"
 *               data_edicao: "2023-04-30T13:00:00Z"
 *       '404':
 *         description: Anotação não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.put('/notes/:id', authToken, checkDateFields, setUpdateDate, updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Exclui uma anotação específica pelo ID
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     description: Rota para excluir uma anotação específica pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da anotação a ser excluída
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Anotação excluída com sucesso
 *         content:
 *           application/json:
 *              example:
 *                  success: true
 *       '404':
 *         description: Anotação não encontrada
 *         content:
 *           application/json:
 *              example:
 *                  message: "Anotação Não Encontrada"
 *                  success: false
 *       '500':
 *         description: Erro interno do servidor
 */
router.delete('/notes/:id', authToken, deleteNote);

module.exports = router;
