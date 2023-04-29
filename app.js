const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const peopleRouter = require('./src/routes/peopleRouter');
const notesRouter = require('./src/routes/notesRouter');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use(peopleRouter);
app.use(notesRouter);


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});