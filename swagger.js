const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RogaLabs Node.js Case',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'token',
        },
      },
    },
  },
  // Coloque aqui a lista de arquivos que contém as rotas da sua aplicação
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};