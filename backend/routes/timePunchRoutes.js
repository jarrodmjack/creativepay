const express = require('express')
const { createTimePunch, getTimePunches } = require('../controllers/timePunchController')
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', getTimePunches)
router.post('/', createTimePunch)

module.exports = router