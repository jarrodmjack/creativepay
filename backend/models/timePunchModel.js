const mongoose = require('mongoose')

const Schema = mongoose.Schema

const timePunchSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timeStart: {
        type: String,
        required: true
    },
    timeEnd: {
        type: String,
        required: true
    },
    hoursWorked: {
        type: String,
        required: true
    },
    totalEarned: {
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model('timePunch', timePunchSchema)