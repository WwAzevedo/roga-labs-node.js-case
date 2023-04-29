const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, getNotesByPeopleId, createNote, updateNote, deleteNote } = require('../controllers/notesController');
const { setCreationDate, setUpdateDate, checkDateFields } = require('../Middelawares/datetimeMiddelawares')

router.get('/notes', getAllNotes); 
router.get('/notes/:id', getNoteById); 
router.get('/notes/people/:id', getNotesByPeopleId); 
router.post('/notes', checkDateFields, setCreationDate, setUpdateDate, createNote); 
router.put('/notes/:id', checkDateFields, setUpdateDate, updateNote);
router.delete('/notes/:id', deleteNote); 

module.exports = router;