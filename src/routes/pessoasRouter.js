const express = require('express');
const router = express.Router();
const { getAllPeople, getPersonById, createPerson, updatePerson, deletePerson } = require('../controllers/pessoasController');

router.get('/pessoas', getAllPeople);
router.get('/pessoas/:id', getPersonById);
router.post('/pessoas', createPerson);
router.put('/pessoas/:id', updatePerson);
router.delete('/pessoas/:id', deletePerson);

module.exports = router;