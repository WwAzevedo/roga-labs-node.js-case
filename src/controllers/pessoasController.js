const { getAllPeople, getPersonById, createPerson, updatePerson, deletePerson } = require('../models/pessoasModel');

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
      const person = await getPersonById(req.params.id);
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
      const { name, age, email, phone } = req.body;
      if (!name || !age || !email || !phone) {
        res.status(400).json({ error: 'Missing required fields' });
      } else {
        const newPerson = await createPerson(name, age, email, phone);
        res.status(201).json(newPerson);
      }
    } catch (err) {
      res.status(500).json({ error: 'Error creating person: ' + err.message });
    }
  },

  updatePerson: async (req, res) => {
    try {
      const { id, name, age, email, phone } = req.body;
      if (!id || !name || !age || !email || !phone) {
        res.status(400).json({ error: 'Missing required fields' });
      } else {
        const updatedPerson = await updatePerson(id, name, age, email, phone);
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