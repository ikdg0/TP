const express = require('express')
const router = express.Router();

const commentaireControlleur = require('../controllers/commantairesControlleur')
const authenticate = require('../middleware/autehtificate')
const checkRole = require('../middleware/checkRoles')

router.post('/', authenticate, checkRole(['journaliste', 'administrateur']), commentaireControlleur.ajoutCommentaire)

router.get('/:technologieId', authenticate, commentaireControlleur.selectCommentByTechno)

router.get('/:utilisateurId', authenticate, commentaireControlleur.selectCommentByUser)

router.get('/:date', authenticate, commentaireControlleur.selectCommentByCreationDate)

module.exports = router