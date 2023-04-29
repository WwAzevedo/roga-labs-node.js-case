const { getAllPeople, getPersonById, createPerson, updatePerson, deletePerson } = require('../models/peopleModel');

const peopleController = {
  getAllPeople: async (req, res) => {
    try {
      const people = await getAllPeople();
      res.status(200).json(people);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching people: ' + err.message });
    }
  },

  getPersonById: async (req, res) => {
    try {
      const person = req.person;

      if (!person) {
        res.status(404).json({ error: 'Person not found' });
      } else {
        res.status(200).json(person);
      }
    } catch (err) {
      res.status(500).json({ error: 'Error fetching person: ' + err.message });
    }
  },

  createPerson: async (req, res) => {
    try {
      const { nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao } = req.body;
      if (!nome || !nome_mae || !nome_pai || !cep || !data_nascimento) {
        res.status(400).json({ error: 'Missing required fields' });
      } else {
        const newPerson = await createPerson(nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao);
        res.status(201).json(newPerson);
      }
    } catch (err) {
      res.status(500).json({ error: 'Error creating person: ' + err.message });
    }
  },

  updatePerson: async (req, res) => {
    try {
      req.body.id = req.params.id
      const { id, nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao } = req.body;
      if (!id || !nome || !nome_mae || !nome_pai || !cep || !data_nascimento) {
        res.status(400).json({ error: 'Missing required fields' });
      } else {
        const updatedPerson = await updatePerson(id, nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao);
        if (!updatedPerson) {
          res.status(404).json({ error: 'Person not found' });
        } else {
          res.status(200).json(updatedPerson);
        }
      }
    } catch (err) {
      res.status(500).json({ error: 'Error updating person: ' + err.message });
    }
  },

  deletePerson: async (req, res) => {
    try {
      const deletedPerson = await deletePerson(req.params.id);
      if (!deletedPerson) {
        res.status(404).json({ error: 'Person not found', success: false  });
      } else {
        res.status(200).json({ success: true });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error deleting person: ' + err.message, success: false  });
    }
  }
};

module.exports = peopleController;