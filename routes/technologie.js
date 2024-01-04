const express = require('express')
const router = express.Router();

const technologie = require('../controllers/technologieController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/', technologie.getAllTechnologies)

router.post('/add', verifyAdmin, technologie.addTechnologie)

router.get('/:id', technologie.getTechnologieById)

router.put('/update/:id', verifyAdmin, technologie.updateTechnologie)

router.delete('/delete/id', verifyAdmin, technologie.deleteTechnologie)


module.exports = router