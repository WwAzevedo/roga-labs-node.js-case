const { getAllNotes, getNoteById, getNotesByPeopleId, createNote, updateNote, deleteNote } = require('../models/notesModel');

const notesController = {

  // Retorna todas as Anotações
  getAllNotes: async (req, res) => {
    try {
      const notes = await getAllNotes();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Retorna uma Anotações pelo ID
  getNoteById: async (req, res) => {
    try {
      const note = await getNoteById(req.params.id);
      if (!note) {
        res.status(404).json({ message: 'Anotação Não Encontrada' });
      } else {
        res.status(200).json(note);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Retorna todas as Anotações de uma pessoa pelo ID da pessoa
  getNotesByPeopleId: async (req, res) => {
    try {
      const note = await getNotesByPeopleId(req.params.id);
      if (note.length === 0) {
        res.status(404).json({ message: 'Não há anotações para essa pessoa.' });
      } else {
        res.status(200).json(note);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Cria uma nova Anotações
  createNote: async (req, res) => {
    try {
      console.log(req.body)
      const { id_pessoa, titulo, descricao, data_cadastro, data_edicao } = req.body;
      if (!id_pessoa || !titulo || !descricao || !data_cadastro || !data_edicao) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes' });
      } else {
        const newNote = await createNote(id_pessoa, titulo, descricao, data_cadastro, data_edicao);
        res.status(201).json(newNote);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza uma Anotações pelo ID
  updateNote: async (req, res) => {
    try {
      req.body.id = req.params.id
      console.log(req.body.id)
      const { id , titulo, descricao, data_edicao } = req.body;
      if (!id || !titulo || !descricao || !data_edicao) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes' });
      } else {
        const updatedNote = await updateNote(id, titulo, descricao, data_edicao);
        if (!updatedNote) {
          res.status(404).json({ message: 'Anotação Não Encontrada' });
        } else {
          res.status(200).json(updatedNote);
        }
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta uma Anotações pelo ID
  deleteNote: async (req, res) => {
    try {
      const deletedNote = await deleteNote(req.params.id);
      if (deletedNote) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: 'Anotação Não Encontrada', success: false  });
      }
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
    }
  }
};

module.exports = notesController;