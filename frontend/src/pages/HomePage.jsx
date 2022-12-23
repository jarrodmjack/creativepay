import React from 'react'
import Table from '../components/Table'
import { useEffect, useState } from 'react'

const HomePage = () => {
    const [employeeList, setEmployeeList] = useState([])
    const [employee, setEmployee] = useState('Christine')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('Office')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')


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

    const handleSubmitTimePunch = async (e) => {
        e.preventDefault()

        const timePunch = {
            employee,
            location,
            date,
            timeStart,
            timeEnd,
        }

        console.log('tp: ', timePunch)
        try {
            const response = await fetch('/api/punch', {
                method: 'POST',
                body: JSON.stringify(timePunch),
                headers: {
                    'Content-Type': 'application/json',
                //     'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)
        } catch (err) {
            console.log(err)
        }
        setEmployee('Christine')
        setLocation('Office')
        setDate('')
        setTimeStart('')
        setTimeEnd('')


    }

    return (
        <div className='flex flex-col p-10 gap-20 container mx-auto'>
            <div>
                <h1 className='text-2xl '>Employee time punches</h1>
            </div>
            <div>
                <form
                    onSubmit={handleSubmitTimePunch}
                    className='flex flex-col gap-4 border-4 border-gray-300 w-1/2 mx-auto shadow-xl rounded-xl p-10'>
                    <div className='flex flex-col w-fit'>
                        <label>Employee</label>
                        <select
                            required
                            className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setEmployee(e.target.value)}
                            value={employee || 'Christine'}
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
                        <label>Location</label>
                        <select
                            value={location || 'Office'}
                            required
                            className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option disabled selected>Choose a Location</option>
                            <option>Office</option>
                            <option>Kathy Weaver</option>
                            <option>Hillcrest</option>
                            <option>Blah Blah</option>
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
                    <button type='submit' className="btn btn-accent w-full">Add Time punch</button>
                </form>
            </div>
            <div>
                <Table />
            </div>
        </div>
    )
}

export default HomePage