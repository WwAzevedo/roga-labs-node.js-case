const request = require('supertest');
const app = require('../../../app');
require('dotenv').config();

const authToken = process.env.AUTH_TOKEN;
let tokenCreatedId;

describe('POST /token', () => {
    it('Deve retornar um novo token', async () => {
      const response = await request(app)
        .post('/token')

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      tokenCreatedId = response.body.token;
    });
  });
  
  describe('DELETE /token/:key', () => {
    it('Deve deletar um token com sucesso', async () => {
      const response = await request(app)
        .delete(`/token/${tokenCreatedId}`)
        .set('token', authToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  
    it('Deve retornar 403 caso o token seja inválido', async () => {
      const response = await request(app)
        .delete(`/token/${tokenCreatedId}`);
      expect(response.status).toBe(403);
    });
  });

