const axios = require('axios');
const { getPersonById } = require('../models/peopleModel');

// Middleware para inserir o CEP buscado via API no objeto Pessoa
const setAddressInfo = async (req, res, next) => {
    try {

      // Obtém o objeto pessoa do banco de dados
      const person = await getPersonById(req.params.id);

      // Verifica se a pessoa existe
      if (!person) {
        return res.status(404).json({ error: 'Pessoa Não Encontrada' });
      }
  
      // Consulta a API de CEP
      const response = await axios.get(`https://viacep.com.br/ws/${person.cep}/json/`);
  
      // Verifica se a consulta foi bem sucedida
      if (response.status !== 200) {
        return res.status(500).json({ error: 'Erro ao Buscar Endereço' });
      }
  
      // Adiciona os dados de endereço ao objeto da pessoa
      person.endereco = response.data;
  
      // Adiciona o objeto da pessoa modificado à requisição para ser usado na rota
      req.person = person;
      console.log(person)
      next();
    } catch (err) {
      res.status(500).json({ error: 'Erro ao Buscar Pessoa: ' + err.message });
    }
  }

// Middleware para verificar se o CEP fornecido é válido e existe na base de dados do ViaCEP
const checkPostalCodeInfo = async (req, res, next) => {
  const cep = req.body.cep;
  const regexCep = /^[0-9]{8}$/; // Expressão regular para validar o formato do CEP

  // Verifica se o CEP possui o formato correto
  if (regexCep.test(cep)) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {

      // Faz uma requisição GET para a API ViaCEP para obter as informações do CEP
      const response = await axios.get(url);

      // Verifica se a resposta da API indica que o CEP não foi encontrado
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