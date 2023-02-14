const express = require('express')
const { getHome, createEmployee } = require('../controllers/homeController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth) 

router.get('/', getHome)

router.post('/', createEmployee)

module.exports = router