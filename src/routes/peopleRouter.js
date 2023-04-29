const express = require('express');
const router = express.Router();
const { getAllPeople, getPersonById, createPerson, updatePerson, deletePerson } = require('../controllers/peopleController');
const { checkPostalCodeInfo, setAddressInfo } = require('../Middelawares/postalCodeMiddelawares')
const { setCreationDate, setUpdateDate, checkDateFields } = require('../Middelawares/datetimeMiddelawares')

router.get('/people', getAllPeople); 
router.get('/people/:id', setAddressInfo, getPersonById); 
router.post('/people', checkDateFields, setCreationDate, setUpdateDate, checkPostalCodeInfo, createPerson); 
router.put('/people/:id',checkDateFields , setUpdateDate, checkPostalCodeInfo, updatePerson); 
router.delete('/people/:id', deletePerson); 

module.exports = router;