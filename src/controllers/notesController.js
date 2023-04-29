const { getAllNotes, getNoteById, getNotesByPeopleId, createNote, updateNote, deleteNote } = require('../models/notesModel');

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

  getNotesByPeopleId: async (req, res) => {
    try {
      const note = await getNotesByPeopleId(req.params.id);
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
      console.log(req.body)
      const { id_pessoa, titulo, descricao, data_cadastro, data_edicao } = req.body;
      if (!id_pessoa || !titulo || !descricao || !data_cadastro || !data_edicao) {
        res.status(400).json({ message: 'Missing required fields' });
      } else {
        const newNote = await createNote(id_pessoa, titulo, descricao, data_cadastro, data_edicao);
        res.status(201).json(newNote);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      req.body.id = req.params.id
      const { id_pessoa, titulo, descricao, data_edicao } = req.body;
      if (!id || !id_pessoa || !titulo || !descricao || !data_edicao) {
        res.status(400).json({ message: 'Missing required fields' });
      } else {
        const updatedNote = await updateNote(id, id_pessoa, titulo, descricao, data_edicao);
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