import Pagination from "../Pagination"
import { useRef, useState } from "react"
import TimePunchTableRow from "./TimePunchTableRow"
import TimePunchTableHeader from "./TimePunchTableHeader"
import TableOptions from "./TableOptions"
import TimePunchCreationForm from "../forms/TimePunchCreationForm"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useReactToPrint } from 'react-to-print'

const TimePunchTable = ({ timePunches }) => {

    const { user } = useAuthContext()
    const [tableTimePunches, setTableTimePunches] = useState(timePunches)
    const [filteredTimePunches, setFilteredTimePunches] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [timepunchesPerPage, settimepunchesPerPage] = useState(12)

    // Pagination
    const indexOfLastTimePunch = currentPage * timepunchesPerPage
    const indexOfFirstTimepunch = indexOfLastTimePunch - timepunchesPerPage
    const currentTimepunches = timePunches.slice(indexOfFirstTimepunch, indexOfLastTimePunch)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleSubmitTimePunch = async (timePunch) => {
        try {
            const response = await fetch('/api/punch', {
                method: 'POST',
                body: JSON.stringify(timePunch),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if (response.ok) {
                const newTimePunch = await response.json()
                setTableTimePunches([newTimePunch, ...tableTimePunches])
            }
        } catch (err) {
            window.alert('There was an issue submitting the timepunch. Please ensure the information entered is correct and try again')
        }
    }

    const handleTogglePaid = async (id, index) => {
        try {
            const response = await fetch(`/api/punch`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id })
            });
            const data = await response.json()
            if (response.ok) {
                const updatedTimePunches = [...currentTimepunches]
                updatedTimePunches[index].paid = data.newPaidStatus
                setTableTimePunches(updatedTimePunches)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleFilterTimePunches = (fromDate, toDate) => {
        fromDate = new Date(fromDate)
        toDate = new Date(toDate)
        setFilteredTimePunches(tableTimePunches.filter((timepunch) => {
            let timepunchDate = new Date(timepunch.date)
            if (timepunchDate <= toDate && timepunchDate >= fromDate) {
                return timepunch
            }
        }))
    }

    const resetTimePunchFilter = () => {
        setFilteredTimePunches([])
    }

    const handleDeleteTimePunch = async (id) => {
        try {
            const response = await fetch(`/api/punch`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                setTableTimePunches(timePunches.filter(timePunch => timePunch._id !== id))
            } else {
                window.alert('There was an issue deleting. Please try again')
            }
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
        <div>
            <div className="overflow-x-auto shadow-xl">
                <TimePunchCreationForm handleSubmitTimePunch={handleSubmitTimePunch} />
                <TableOptions handlePrint={handlePrint} handleFilterTimePunches={handleFilterTimePunches} handleResetFilter={resetTimePunchFilter} />
                <table ref={componentRef} className="table w-full">
                    <TimePunchTableHeader />
                    <tbody>
                        {
                            filteredTimePunches.length > 0 ? (
                                filteredTimePunches.map((timePunch, i) => (
                                    <TimePunchTableRow
                                        key={i}
                                        index={i}
                                        togglePaid={handleTogglePaid}
                                        timePunch={timePunch}
                                        handleDelete={handleDeleteTimePunch} />
                                ))
                            ) : (
                                currentTimepunches.map((timePunch, i) => (
                                    <TimePunchTableRow
                                        key={i}
                                        index={i}
                                        togglePaid={handleTogglePaid}
                                        timePunch={timePunch}
                                        handleDelete={handleDeleteTimePunch} />
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
            {!filteredTimePunches.length && <Pagination timepunchesPerPage={timepunchesPerPage} totalTimePunches={timePunches.length} paginate={paginate} currentPage={currentPage} />}
        </div>
    )
}

export default TimePunchTable