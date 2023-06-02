const express = require('express')
const { getHome } = require('../controllers/homeController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth) 

router.get('/', getHome)

module.exports = router