const { getAllPeopleModel, getPersonByIdModel, createPersonModel, updatePersonModel, deletePersonModel } = require('../models/peopleModel');

const peopleController = {

  // Retorna todas as Pessoas
  getAllPeople: async (req, res) => {
    try {
      const people = await getAllPeopleModel();
      res.status(200).json(people);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar pessoa: ' + err.message });
    }
  },

  // Retorna uma Pessoa pelo ID
  getPersonById: async (req, res) => {
    try {
      // Acessa a pessoa retornada pelo middleware 'postalCodeMiddelaware'
      const person = req.person;

      if (!person) {
        res.status(404).json({ error: 'Pessoa não encontrada' });
      } else {
        res.status(200).json(person);
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar pessoa: ' + err.message });
    }
  },
  
  // Cria uma nova Pessoa
  createPerson: async (req, res) => {
    try {
      const { nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao } = req.body;
      if (!nome || !nome_mae || !nome_pai || !cep || !data_nascimento) {
        res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      } else {
        const newPerson = await createPersonModel(nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao);
        res.status(201).json(newPerson);
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar pessoa: ' + err.message });
    }
  },

  // Atualiza uma Pessoa pelo ID
  updatePerson: async (req, res) => {
    try {
      req.body.id = req.params.id
      const { id, nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao } = req.body;
      if (!id || !nome || !nome_mae || !nome_pai || !cep || !data_nascimento) {
        res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      } else {
        const updatedPerson = await updatePersonModel(id, nome, nome_mae, nome_pai, cep, data_nascimento, data_edicao);
        if (!updatedPerson) {
          res.status(404).json({ error: 'Pessoa não encontrada' });
        } else {
          res.status(200).json(updatedPerson);
        }
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar pessoa: ' + err.message });
    }
  },

  // Deleta uma Pessoa pelo ID
  deletePerson: async (req, res) => {
    try {
      const deletedPerson = await deletePersonModel(req.params.id);
      if (!deletedPerson) {
        res.status(404).json({ error: 'Pessoa não encontrada', success: false  });
      } else {
        res.status(204).json({ success: true });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar pessoa: ' + err.message, success: false  });
    }
  }
};

module.exports = peopleController;