const { getAllNotesModel, getNoteByIdModel, getNotesByPeopleIdModel, createNoteModel, updateNoteModel, deleteNoteModel } = require('../models/notesModel');

const notesController = {

  // Retorna todas as Anotações
  getAllNotes: async (req, res) => {
    try {
      const notes = await getAllNotesModel();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Retorna uma Anotações pelo ID
  getNoteById: async (req, res) => {
    try {
      const note = await getNoteByIdModel(req.params.id);
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
      const note = await getNotesByPeopleIdModel(req.params.id);
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
      const { id_pessoa, titulo, descricao, data_cadastro, data_edicao } = req.body;
      if (!id_pessoa || !titulo || !descricao || !data_cadastro || !data_edicao) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes' });
      } else {
        const newNote = await createNoteModel(id_pessoa, titulo, descricao, data_cadastro, data_edicao);
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
      const { id , titulo, descricao, data_edicao } = req.body;
      if (!id || !titulo || !descricao || !data_edicao) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes' });
      } else {
        const updatedNote = await updateNoteModel(id, titulo, descricao, data_edicao);
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
      const deletedNote = await deleteNoteModel(req.params.id);
      if (deletedNote) {
        res.status(204).json({ success: true });
      } else {
        res.status(404).json({ message: 'Anotação Não Encontrada', success: false  });
      }
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
    }
  }
};

module.exports = notesController;