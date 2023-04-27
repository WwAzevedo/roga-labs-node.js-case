const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const pessoaRouter = require('./src/routes/pessoasRouter');
const anotacaoRouter = require('./src/routes/anotacoesRouter');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use(pessoaRouter);
app.use(anotacaoRouter);


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});