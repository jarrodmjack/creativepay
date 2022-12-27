const axios = require('axios')
const TimePunch = require('../models/timePunchModel')
const Employee = require('../models/employeeModel')
// const calcDifference = require('../utils/calcTimeDifference')
// import calcDifference from '../utils/calcTimeDifference'

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

    try {
        const {
            employee,
            location,
            date,
            timeStart,
            timeEnd,
        } = req.body

        const calcDifference = (timeStart, timeEnd) => {
            timeStart = timeStart.split(':').join('')
            timeEnd = timeEnd.split(':').join('')
            let arr = [timeStart, timeEnd]
            let parsedHours = arr.map((str) => {
                let hours = parseInt(str.substr(0, 2), 10)
                let minutes = parseInt(str.substr(2, 4), 10)
                return (hours * 60 + minutes) / 60;
            });
            const worked = parsedHours[1] - parsedHours[0]
            return Math.ceil(worked / 0.5) * 0.5;
        }

        const worked = calcDifference(timeStart, timeEnd)
        const emp = await Employee.find({ name: employee })
        const moneyEarned = worked * emp[0].rate

        await TimePunch.create({
            employeeId: emp[0]._id,
            employeeName: emp[0].name,
            date: date,
            location: location,
            timeStart: timeStart,
            timeEnd: timeEnd,
            hoursWorked: worked,
            totalEarned: moneyEarned,
        })
    } catch (err) {
        console.log(err)
    }
    res.status(200).json({ msg: 'time punch successfully created' })
}






module.exports = { getTimePunches, createTimePunch }