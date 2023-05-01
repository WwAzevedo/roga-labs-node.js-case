const request = require('supertest');
const app = require('../../../app');
require('dotenv').config();

const authToken = process.env.AUTH_TOKEN;
let noteCreatedId;

const noteData = {
    id_pessoa: 1,
    titulo: "Minha primeira anotação atualizada",
    descricao: "Esta é a minha primeira anotação atualizada"
  };
  
  const invalidNoteData = {
    descricao: "Esta é a minha primeira anotação"
  };

  describe('GET /anotacoes', () => {
    it('Deve retornar todas as notas', async () => {
      const response = await request(app)
        .get('/anotacoes')
        .set('token', authToken);
  
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('id_pessoa');
      expect(response.body[0]).toHaveProperty('titulo');
      expect(response.body[0]).toHaveProperty('descricao');
      expect(response.body[0]).toHaveProperty('data_cadastro');
      expect(response.body[0]).toHaveProperty('data_edicao');
    });
  
    it('Deve retornar 403 status code quando o token for inválido', async () => {
      const response = await request(app).get('/anotacoes');
  
      expect(response.status).toBe(403);
    });
  });
  
  describe('GET /anotacoes/:id', () => {
    it('Deve retornar uma nota pelo seu ID', async () => {
      const response = await request(app)
        .get('/anotacoes/1')
        .set('token', authToken);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('id_pessoa', 1);
      expect(response.body).toHaveProperty('titulo');
      expect(response.body).toHaveProperty('descricao');
      expect(response.body).toHaveProperty('data_cadastro');
      expect(response.body).toHaveProperty('data_edicao');
    });
  
    it('Deve retornar 404 status code quando não encontrar a anotação', async () => {
      const response = await request(app)
        .get('/anotacoes/999')
        .set('token', authToken);
  
      expect(response.status).toBe(404);
    });
  
    it('Deve retornar 403 status code quando o token for inválido', async () => {
      const response = await request(app).get('/anotacoes/1');
  
      expect(response.status).toBe(403);
    });
  });

  describe('GET /anotacoes/pessoas/:id', () => {
    it('Deve retornar uma lista com todas as notas atreladas a uma pessoa pelo ID', async () => {
      const res = await request(app)
        .get('/anotacoes/pessoas/1')
        .set('token', authToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  
    it('Deve retornar 404 status code quando não encontrar a pessoa', async () => {
      const res = await request(app)
        .get('/anotacoes/pessoas/9999999')
        .set('token', authToken);
      expect(res.statusCode).toEqual(404);
    });
  
    it('Deve retornar 403 status code quando o token for inválido', async () => {
      const res = await request(app).get('/anotacoes/pessoas/1');
      expect(res.statusCode).toEqual(403);
    });
  });

  describe('POST /anotacoes', () => {
    it('Deve criar uma nova Nota', async () => {
      const response = await request(app)
        .post('/anotacoes')
        .set('token', authToken)
        .send(noteData)
        .expect(201);
        

      noteCreatedId = response.body.id;
      expect(response.body.id_pessoa).toBe(noteData.id_pessoa);
      expect(response.body.titulo).toBe(noteData.titulo);
      expect(response.body.descricao).toBe(noteData.descricao);
      expect(response.body.data_cadastro).toBeDefined();
      expect(response.body.data_edicao).toBeDefined();
    });
  
    it('Deve retornar 400 caso o payload seja inválido', async () => {
      const response = await request(app)
        .post('/anotacoes')
        .set('token', authToken)
        .send(invalidNoteData)
        .expect(400)
    });
  
    it('Deve retornar 403 caso o token for inválido', async () => {
      const response = await request(app)
        .post('/anotacoes')
        .send(noteData)
        .expect(403)
    });
  });
  
  describe('PUT /anotacoes/:id', () => {
    it('Deve atualizar uma nota com sucesso', async () => {
  
      // Atualizar a anotação criada
      const response = await request(app)
        .put(`/anotacoes/1`)
        .send(noteData)
        .set('token', authToken);
  
      expect(response.status).toBe(200);
      expect(response.body.id_pessoa).toBe(1);
      expect(response.body.titulo).toBe('Minha primeira anotação atualizada');
      expect(response.body.descricao).toBe('Esta é a minha primeira anotação atualizada');
      expect(response.body.data_cadastro).toBeDefined();
      expect(response.body.data_edicao).toBeDefined();
    });
  
    it('Deve retornar 404 caso a nota não seja encontrada', async () => {
      const response = await request(app)
        .put('/anotacoes/999999999')
        .send(noteData)
        .set('token', authToken);
  
      expect(response.status).toBe(404);
    });
  
    it('Deve retornar 400 caso o payload seja inválido', async () => {

      const response = await request(app)
        .put(`/anotacoes/1`)
        .send(invalidNoteData)
        .set('token', authToken);
  
      expect(response.status).toBe(400);
    });
  
    it('Deve retornar 403 caso o token seja inválido', async () => {
  
      const response = await request(app)
        .put(`/anotacoes/1`)
        .send(noteData)
  
      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /note/:id', () => {
    it('Deve Deletar uma nota com sucesso', async () => {
      const response = await request(app)
        .delete(`/anotacoes/${noteCreatedId}`)
        .set('token', authToken);

      expect(response.status).toEqual(204);
    });
  
    it('Deve retornar 404 caso não encontre a nota', async () => {
      const response = await request(app)
        .delete(`/anotacoes/${noteCreatedId}`)
        .set('token', authToken);
  
      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('success', false);
    });
  });