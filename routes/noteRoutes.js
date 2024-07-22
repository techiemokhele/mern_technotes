const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJWT')
const notesController = require('../controllers/notesController')

router.use(verifyJwt)

router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote)

module.exports = router