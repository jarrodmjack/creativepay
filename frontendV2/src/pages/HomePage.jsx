import React, { useRef } from 'react'
import Table from '../components/Table'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print'
import TableOptions from '../components/TableOptions';
import EmployeeTotals from '../components/EmployeeTotals';

const HomePage = () => {

    const { user } = useAuthContext()
    const [employeeList, setEmployeeList] = useState([])
    const [employee, setEmployee] = useState('Christine')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('Office')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [timePunches, setTimePunches] = useState([])
    const [filteredTimePunches, setFilteredTimePunches] = useState([])
    const [filterDates, setFilterDates] = useState({
        fromDate: '',
        toDate: ''
    })

    const fetchTimePunches = async () => {
        const response = await fetch('/api/punch/', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (!response.ok) {
            localStorage.removeItem('user');
            <Navigate to='/login' />
        }
        const data = await response.json()
        setTimePunches(data)
    }

    useEffect(() => {

        fetchTimePunches()
        const fetchData = async () => {
            const response = await fetch('/api/home/', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()
            setEmployeeList(data)
        }
        fetchData()
    }, [])

    // *****TODO SORT TIME PUNCHES BY DATE*****
    const handleSortTimePunches = () => {
        console.log('handlesort')
    }

    const handleFilterTimePunches = (e, fromDate, toDate) => {
        e.preventDefault()

        setFilterDates({ ...filterDates, fromDate, toDate })

        fromDate = new Date(fromDate)
        toDate = new Date(toDate)
        setFilteredTimePunches(timePunches.filter((timepunch) => {
            let timepunchDate = new Date(timepunch.date)
            if (timepunchDate <= toDate && timepunchDate >= fromDate) {
                return timepunch
            }
        }))
    }

    const handleResetFilter = (e) => {
        e.preventDefault()
        setFilteredTimePunches([])
    }

    const handleSubmitTimePunch = async (e) => {
        e.preventDefault()

        const timePunch = {
            employee,
            location,
            date,
            timeStart,
            timeEnd,
        }

        try {
            const response = await fetch('/api/punch', {
                method: 'POST',
                body: JSON.stringify(timePunch),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const newTimePunch = await response.json()
            setTimePunches([...timePunches, newTimePunch])
        } catch (err) {
            console.log(err)
        }
        setEmployee('Christine')
        setLocation('Office')
        setDate('')
        setTimeStart('')
        setTimeEnd('')
    }

    async function handleDelete(id) {
        try {
            await fetch(`/api/punch`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id })
            });
            setTimePunches(timePunches.filter(timePunch => timePunch._id !== id))
        } catch (error) {
            console.error(error);
        }
    }

    const componentRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'timepunch-data',
    })


    return (
        <div className='flex flex-col p-10 gap-4 container mx-auto'>
            <div>
                <form
                    onSubmit={handleSubmitTimePunch}
                    className='flex flex-col gap-4 border-4 border-gray-300 mx-auto shadow-xl rounded-xl p-10 w-2/3 justify-center'>
                    <div className='flex justify-evenly'>
                        <div className='flex flex-col w-fit'>
                            <label>Employee</label>
                            <select
                                required
                                className="select select-bordered w-full max-w-xs"
                                onChange={(e) => setEmployee(e.target.value)}
                                value={employee || 'Christine'}
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
            </div>
            <TableOptions handlePrint={handlePrint} handleFilterTimePunches={handleFilterTimePunches} handleResetFilter={handleResetFilter} />
            <div>
                <div className='flex flex-col' ref={componentRef} style={{ width: '100%', height: '100%' }}>
                    <div className='bg-base-100 h-20 flex flex-col justify-center'>
                        <EmployeeTotals filterDates={filterDates} timePunches={timePunches} />
                    </div>
                    <Table timePunches={timePunches} filteredTimePunches={filteredTimePunches} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    )
}

export default HomePage