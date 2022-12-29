const express = require('express')
const { createTimePunch, getTimePunches, deleteTimePunch } = require('../controllers/timePunchController')
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', getTimePunches)
router.post('/', createTimePunch)
router.delete('/', deleteTimePunch)

module.exports = router