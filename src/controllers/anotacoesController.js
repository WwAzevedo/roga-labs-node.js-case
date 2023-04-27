const { getAllNotes, getNoteById, createNote, updateNote, deleteNote } = require('../models/anotacoesModel');

const notesController = {
  getAllNotes: async (req, res) => {
    try {
      const notes = await getAllNotes();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getNoteById: async (req, res) => {
    try {
      const note = await getNoteById(req.params.id);
      if (!note) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        res.status(200).json(note);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createNote: async (req, res) => {
    try {
      const { title, content, author } = req.body;
      if (!title || !content || !author) {
        res.status(400).json({ message: 'Missing required fields' });
      } else {
        const newNote = await createNote(title, content, author);
        res.status(201).json(newNote);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      const { id, title, content, author } = req.body;
      if (!title || !content || !author) {
        res.status(400).json({ message: 'Missing required fields' });
      } else {
        const updatedNote = await updateNote(id, title, content, author);
        if (!updatedNote) {
          res.status(404).json({ message: 'Note not found' });
        } else {
          res.status(200).json(updatedNote);
        }
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteNote: async (req, res) => {
    try {
      const deletedNote = await deleteNote(req.params.id);
      if (deletedNote) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: 'Note not found', success: false  });
      }
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
    }
  }
};

module.exports = notesController;