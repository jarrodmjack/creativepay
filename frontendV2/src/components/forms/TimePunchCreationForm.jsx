import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const TimePunchCreationForm = ({ handleSubmitTimePunch }) => {

    const { user } = useAuthContext()
    const [employee, setEmployee] = useState('')
    const [location, setLocation] = useState('Office')
    const [date, setDate] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        const fetchEmployeeList = async () => {
            const response = await fetch('/api/home/', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()
            setEmployeeList(data)
        }
        fetchEmployeeList()
    }, [])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (employee && employee !== '') {
                    handleSubmitTimePunch({
                        employee,
                        location,
                        date,
                        timeEnd,
                        timeStart,
                    })
                    setLocation('Office')
                    setDate('')
                    setTimeStart('')
                    setTimeEnd('')
                } else {
                    window.alert('Please ensure the information you have selected is correct')
                }
            }}
            className='flex flex-col gap-4 border-4 border-gray-300 mx-auto shadow-xl rounded-xl p-10 w-2/3 justify-center'>
            <div className='flex justify-evenly'>
                <div className='flex flex-col w-fit'>
                    <label>Employee</label>
                    <select
                        required
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setEmployee(e.target.value)}
                    >
                        <option disabled selected>Employee Name</option>
                        {employeeList && employeeList.map((employee, i) => (
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
                        <option>Klix</option>
                        <option>GS</option>
                        <option>WV</option>
                        <option>PG</option>
                        <option>TT</option>
                        <option>PS</option>
                        <option>GA</option>
                        <option>SL</option>
                        <option>KS</option>
                        <option>MA</option>
                        <option>WN</option>
                        <option>VS</option>
                        <option>RS</option>
                        <option>QM</option>
                        <option>WP</option>
                        <option>SC</option>
                        <option>ED</option>
                        <option>HC</option>
                        <option>HD</option>
                        <option>QD</option>
                        <option>PW</option>
                        <option>QV</option>
                        <option>DD</option>
                        <option>CW</option>
                        <option>BG</option>
                        <option>HP</option>
                        <option>RD</option>
                        <option>MC</option>
                        <option>WW</option>
                        <option>VI</option>
                        <option>SH</option>
                        <option>GV</option>
                        <option>GL</option>
                        <option>HB</option>
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
            </div>
            <div>
                <button type='submit' className="btn btn-primary w-full">Add Time punch</button>
            </div>
        </form>
    )
}

export default TimePunchCreationForm