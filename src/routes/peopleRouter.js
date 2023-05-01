const express = require('express');
const router = express.Router();
const { getAllPeople, getPersonById, createPerson, updatePerson, deletePerson } = require('../controllers/peopleController');
const { checkPostalCodeInfo, setAddressInfo } = require('../Middelawares/postalCodeMiddelawares')
const { setCreationDate, setUpdateDate, checkDateFields } = require('../Middelawares/datetimeMiddelawares')

// Importa a função de middleware para autenticação de token
const { authToken } = require('../Middelawares/verifyAuthToken');

/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Retorna a lista de todas as pessoas
 *     tags: [Pessoas]
 *     description: Retorna uma lista com todas as pessoas cadastradas no sistema.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nome: João da Silva
 *                 nome_mae: Maria da Silva
 *                 nome_pai: José da Silva
 *                 cep: 01001000
 *                 data_nascimento: "1990-01-01T02:00:00.000Z"
 *                 data_cadastro: "2022-04-28T03:00:00.000Z"
 *                 data_edicao: "2022-04-28T03:00:00.000Z"
 *               - id: 2
 *                 nome: Maria Aparecida
 *                 nome_mae: Lucia Aparecida
 *                 nome_pai: Pedro Aparecido
 *                 cep: 07021050
 *                 data_nascimento: "1985-03-15T03:00:00.000Z"
 *                 data_cadastro: "2022-04-28T03:00:00.000Z"
 *                 data_edicao: "2022-04-28T03:00:00.000Z"
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/pessoas', authToken, getAllPeople);

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Retorna uma pessoa específica com seu endereço,
 *     tags: [Pessoas]
 *     description: Retorna uma pessoa específica com base no seu ID e busca seu endereço com base no CEP.
 *     security:
 *       - ApiKeyAuth: []    
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da pessoa a ser obtida.
 *     responses:
 *       200:
 *         description: Pessoa retornada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *                id: 2
 *                nome: Maria Aparecida
 *                nome_mae: Lucia Aparecida
 *                nome_pai: Pedro Aparecido
 *                cep: "07021050"
 *                data_nascimento: "1985-03-15T03:00:00.000Z"
 *                data_cadastro: "2022-04-28T03:00:00.000Z"
 *                data_edicao: "2022-04-28T03:00:00.000Z"
 *                endereco:
 *                  cep: "07021-050"
 *                  logradouro: Rua Santa Rita de Cássia
 *                  complemento: ""
 *                  bairro: Vila Pedro Moreira
 *                  localidade: Guarulhos
 *                  uf: SP
 *                  ibge: "3518800"
 *                  gia: "3360"
 *                  ddd: "11"
 *                  siafi: "6477"
 * 
 *       404:
 *         description: Pessoa não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/pessoas/:id', authToken, setAddressInfo, getPersonById);

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cria uma nova pessoa
 *     tags: [Pessoas]
 *     description: Cria uma nova pessoa com as informações fornecidas.
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                 nome_mae:
 *                   type: string
 *                 nome_pai:
 *                   type: string
 *                 cep:
 *                   type: string
 *                 data_nascimento:
 *                   type: string
 *                   format: date
 *               required:
 *                 - nome
 *                 - nome_mae
 *                 - nome_pai
 *                 - cep
 *                 - data_nascimento
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: "Eduardo Silva"
 *               nome_mae: "Ana Carolina"
 *               nome_pai: "Antonio Carlos"
 *               cep: "07707060"
 *               data_nascimento: "2023-04-30T13:00:00Z"
 *               data_cadastro: "2023-04-30T13:00:00Z"
 *               data_edicao: "2023-04-30T13:00:00Z"
 *       400:
 *         description: Dados da pessoa inválidos.
 *       500:
 *         description: Erro interno do servidor.
 *
 */

router.post('/pessoas', authToken, checkDateFields, setCreationDate, setUpdateDate, checkPostalCodeInfo, createPerson); 

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa existente
 *     tags: [Pessoas]
 *     description: Atualiza as informações de uma pessoa existente com base no seu ID.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da pessoa a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                nome:
 *                  type: string
 *                nome_mae:
 *                  type: string
 *                nome_pai:
 *                  type: string
 *                cep:
 *                  type: string
 *                data_nascimento:
 *                  type: string
 *                  format: date
 *              required:
 *                - nome
 *                - nome_mae
 *                - nome_pai
 *                - cep
 *                - data_nascimento
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: "Eduardo Silva"
 *               nome_mae: "Ana Carolina"
 *               nome_pai: "Antonio Carlos"
 *               cep: "07707060"
 *               data_nascimento: "2023-04-30T13:00:00Z"
 *               data_cadastro: "2023-04-30T13:00:00Z"
 *               data_edicao: "2023-04-30T13:00:00Z"
 *       400:
 *         description: Dados da pessoa inválidos.
 *       404:
 *         description: Pessoa não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 * 
 */
router.put('/pessoas/:id', authToken,checkDateFields , setUpdateDate, checkPostalCodeInfo, updatePerson);

/**
 * @swagger
 *
 * /pessoas/{id}:
 *   delete:
 *     summary: Exclui uma pessoa específica pelo ID.
 *     tags: [Pessoas]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da pessoa a ser excluída.
 *     responses:
 *       '204':
 *         description: Pessoa excluída com sucesso
 *         content:
 *           application/json:
 *              example:
 *                  success: true
 *       '404':
 *         description: Pessoa não encontrada
 *         content:
 *           application/json:
 *              example:
 *                  message: "Pessoa Não Encontrada"
 *                  success: false
 *       500:
 *         description: Houve um erro ao excluir a pessoa.
 */
router.delete('/pessoas/:id', authToken, deletePerson);

module.exports = router;