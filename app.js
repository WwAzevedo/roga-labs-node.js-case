const express = require('express');
const cors = require('cors');
const swagger = require('./swagger');

// Importa as rotas definidas nos arquivos de roteamento
const peopleRouter = require('./src/routes/peopleRouter');
const notesRouter = require('./src/routes/notesRouter');
const authTokenRouter = require('./src/routes/authTokenRouter');

// Cria a instância da aplicação Express
const app = express();

// Adiciona os middlewares necessários para processar as requisições HTTP
app.use(express.json());
app.use(cors());

// Define as rotas da aplicação, usando as rotas importadas dos arquivos de roteamento
app.use(peopleRouter);
app.use(notesRouter);
app.use(authTokenRouter);
swagger(app);

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;