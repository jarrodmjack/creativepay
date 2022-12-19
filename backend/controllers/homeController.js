const axios = require('axios')
const Employee = require('../models/employeeModel')

const getHome = async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)
    }
    catch (err) {
        res.json(err)
    }
}

const createEmployee = async (req, res) => {
    try{
        const employee = await Employee.create({name: 'Tabytha', rate: 17})
        res.status(200).json(employee)
    }catch(err){
        res.status(400).json(err)
    }

}






module.exports = { createEmployee, getHome }