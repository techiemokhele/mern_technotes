const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJWT')
const usersController = require('../controllers/usersController')

router.use(verifyJwt)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router