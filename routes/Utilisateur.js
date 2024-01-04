const express = require('express')
const router = express.Router();

const utilisateurControlleur = require('../controllers/utilisateurControlleur')


router.get('/', utilisateurControlleur.getUtilisateurs)

router.post('/add', utilisateurControlleur.addUtilisateur)

router.get('/:id', utilisateurControlleur.selectID)

router.put('/update/:id', utilisateurControlleur.updateId)

router.delete('/remove/:id', utilisateurControlleur.removeUtilisateur)

router.post('/signup', utilisateurControlleur.signup);

module.exports = router