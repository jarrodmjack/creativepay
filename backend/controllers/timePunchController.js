const axios = require('axios')
const TimePunch = require('../models/timePunchModel')

const getTimePunches = async (req, res) => {
    try {
        const timePunches = await TimePunch.find()
        res.status(200).json(timePunches)
    }
    catch (err) {
        res.json(err)
    }
}

const createTimePunch = async (req, res) => {
    //const timePunch = req.body.blabla
    // const employee = await TimePunch.create(blabla)
    res.status(200).json({postPunch: 'hit post punch'})
}






module.exports = { getTimePunches, createTimePunch }