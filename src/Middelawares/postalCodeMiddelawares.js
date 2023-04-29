const axios = require('axios');
const { getPersonById} = require('../models/peopleModel');

const setAddressInfo = async (req, res, next) => {
    try {

      // Obtém o objeto pessoa do banco de dados
      const person = await getPersonById(req.params.id);

      // Verifica se a pessoa existe
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Consulta a API de CEP
      const response = await axios.get(`https://viacep.com.br/ws/${person.cep}/json/`);
  
      // Verifica se a consulta foi bem sucedida
      if (response.status !== 200) {
        return res.status(500).json({ error: 'Error fetching address data' });
      }
  
      // Adiciona os dados de endereço ao objeto da pessoa
      person.endereco = response.data;
  
      // Adiciona o objeto da pessoa modificado à requisição para ser usado na rota
      req.person = person;
      console.log(person)
      next();
    } catch (err) {
      res.status(500).json({ error: 'Error fetching person: ' + err.message });
    }
  }


const checkPostalCodeInfo = async (req, res, next) => {
  const cep = req.body.cep;
  const regexCep = /^[0-9]{8}$/;

  if (regexCep.test(cep)) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
      const response = await axios.get(url);
      if (response.data.erro) {
        res.status(400).json({ error: 'CEP inválido' });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro na verificação do CEP' });
    }
  } else {
    res.status(400).json({ error: 'CEP inválido' });
  }
};

module.exports = {
    checkPostalCodeInfo,
    setAddressInfo,
}