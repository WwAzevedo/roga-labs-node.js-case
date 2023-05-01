const request = require('supertest');
const app = require('../../../app');
require('dotenv').config();

const authToken = process.env.AUTH_TOKEN;
let userCreatedId;

const personData = {
  nome: 'Eduardo Silva',
  nome_mae: 'Ana Carolina',
  nome_pai: 'Antonio Carlos',
  cep: '07807060',
  data_nascimento: '2023-04-30T13:00:00Z'
};

const invalidPersonData = {
  nome: '',
  nome_mae: 'Ana Carolina',
  nome_pai: 'Antonio Carlos',
  cep: 'invalid',
  data_nascimento: '2023-04-30T13:00:00Z'
};

describe('GET /pessoas', () => {
  it('Deve retornar uma lista de usuários', async () => {
    const response = await request(app)
      .get('/pessoas')
      .set('token', authToken);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Deve retonar informações de uma pessoa pelo ID, junto ao seu endereço.', async () => {
    const response = await request(app)
      .get('/pessoas/2')
      .set('token', authToken);

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Maria Aparecida');
    expect(response.body.endereco).toBeDefined();
  });

  it('Deve retornar 404 caso não encontre a pessoa', async () => {
    const response = await request(app)
      .get('/pessoas/9999')
      .set('token', authToken);

    expect(response.status).toBe(404);
  });
});

describe('PUT /pessoas/:id', () => {
  it('Deve atualizar uma pessoa com sucesso', async () => {
    const response = await request(app)
      .put('/pessoas/1')
      .set('token', authToken)
      .send({
        nome: 'João da Silva',
        nome_mae: 'Maria da Silva',
        nome_pai: 'José da Silva',
        cep: '07807060',
        data_nascimento: '1990-01-01'
      });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('nome', 'João da Silva');
    expect(response.body).toHaveProperty('nome_mae', 'Maria da Silva');
    expect(response.body).toHaveProperty('nome_pai', 'José da Silva');
    expect(response.body).toHaveProperty('cep', '07807060');
    expect(response.body).toHaveProperty('data_nascimento');
    expect(response.body).toHaveProperty('data_cadastro');
    expect(response.body).toHaveProperty('data_edicao');
  });

  it('Deve retornar 400 caso o payload seja invalido.', async () => {
    const response = await request(app)
      .put('/pessoas/1')
      .set('token', authToken)
      .send({
        nome: 'João da Silva',
        nome_mae: 'Maria da Silva',
        nome_pai: 'José da Silva',
        cep: '12345678'
      });

    expect(response.status).toEqual(400);
  });

  it('Deve retornar 404 caso não encontre a pessoa', async () => {
    const response = await request(app)
      .put('/pessoas/9999999')
      .set('token', authToken)
      .send({
        nome: 'João da Silva',
        nome_mae: 'Maria da Silva',
        nome_pai: 'José da Silva',
        cep: '07807060',
        data_nascimento: '1990-01-01'
      });

    expect(response.status).toEqual(404);
  });
});


describe('POST /pessoas', () => {
  it('Deve criar uma nova pessoa', async () => {
    const response = await request(app)
      .post('/pessoas')
      .set('token', authToken)
      .send(personData);

    userCreatedId = response.body.id;
    expect(response.status).toBe(201);
  });

  it('Deve retornar 400 caso o payload seja invalido', async () => {
    const response = await request(app)
      .post('/pessoas')
      .set('token', authToken)
      .send(invalidPersonData);

    expect(response.status).toBe(400);
  });

});


describe('DELETE /pessoas/:id', () => {
  it('Deve Deletar uma pessoa com sucesso', async () => {
    const response = await request(app)
      .delete(`/pessoas/${userCreatedId}`)
      .set('token', authToken);
    expect(response.status).toEqual(204);
  });

  it('Deve retornar 404 caso não encontre a pessoa', async () => {
    const response = await request(app)
      .delete(`/pessoas/${userCreatedId}`)
      .set('token', authToken);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('error', 'Pessoa não encontrada');
    expect(response.body).toHaveProperty('success', false);
  });
});

