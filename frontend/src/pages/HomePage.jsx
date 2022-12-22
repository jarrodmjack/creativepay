import React from 'react'
import Table from '../components/Table'
import { useEffect, useState } from 'react'

const HomePage = () => {

    /* 
    - employee(dropdown)
- date
- location
- time start
- time end
- total rate
    */
    const [employeeList, setEmployeeList] = useState([])
    const [employee, setEmployee] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [totalRate, setTotalRate] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/home', {
                method: "GET"
            })
            const data = await response.json()
            setEmployeeList(data)
        }
        fetchData()
    }, [])


    console.log(employee)
    console.log(date)
    console.log(location)
    console.log(timeStart)
    console.log(timeEnd)
    // console.log(employee)
    return (
        <div className='flex flex-col p-10 gap-20 container mx-auto'>
            <div>
                <h1 className='text-2xl '>Employee time punches</h1>
            </div>
            <div>
                <form className='flex flex-col gap-4 border-4 border-gray-300 w-1/2 mx-auto shadow-xl '>
                    <div className='flex flex-col w-fit'>
                        <label htmlFor="employee">Employee</label>
                        <select
                            id='employee'
                            className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setEmployee(e.target.value)}
                        // defaultValue='Christine'
                        >
                            <option disabled selected>Employee Name</option>
                            {employeeList.map((employee, i) => (
                                <option
                                    key={i}
                                >
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col w-fit'>
                        <label htmlFor="employee">Location</label>
                        <select
                            id='employee'
                            className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option disabled selected>Choose a Location</option>
                            <option>Test</option>
                            <option>Test 1</option>
                            <option>Test 2</option>
                            <option>Test 3</option>
                            <option>Test 4</option>
                            <option>Test 5</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-fit'>
                        <label>Date</label>
                        <input
                            required
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                    </div>
                    <div className='flex flex-col w-fit'>
                        <label>Time Start</label>
                        <input
                            required
                            type="time"
                            onChange={(e) => setTimeStart(e.target.value)}
                            value={timeStart}
                        />
                    </div>
                    <div className='flex flex-col w-fit'>
                        <label>Time End</label>
                        <input
                            required
                            type="time"
                            onChange={(e) => setTimeEnd(e.target.value)}
                            value={timeEnd}
                        />
                    </div>
                    <button className="btn btn-accent w-full">Add Time punch</button>
                </form>
            </div>
            <div>
                <Table />
            </div>
        </div>
    )
}

export default HomePage