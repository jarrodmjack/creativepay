const express = require('express')
const { createTimePunch, getTimePunches, deleteTimePunch, updatePaidStatus } = require('../controllers/timePunchController')
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', getTimePunches)
router.put('/', updatePaidStatus)
router.post('/', createTimePunch)
router.delete('/', deleteTimePunch)

module.exports = router