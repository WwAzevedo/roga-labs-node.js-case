const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, createNote, updateNote, deleteNote } = require('../controllers/anotacoesController');

router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;