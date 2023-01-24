import formatTime from "../utils/formatTime"
import formatDate from "../utils/formatDate"

const Table = ({ timePunches, handleDelete }) => {

    const handleTogglePaid = async (id) => {
        // console.log('handle toggle paid', id)
        try {
            await fetch(`/api/punch`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="overflow-x-auto shadow-xl">
            <table className="table w-full ">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Time Start</th>
                        <th>Time End</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Hours worked</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {timePunches.map((timePunch, i) => (
                        <tr
                            key={i} className="cursor-pointer">
                            <td>{timePunch.employeeName}</td>
                            <td>{formatDate(timePunch.date)}</td>
                            <td>{timePunch.location}</td>
                            <td>{formatTime(timePunch.timeStart)}</td>
                            <td>{formatTime(timePunch.timeEnd)}</td>
                            <td>${timePunch.totalEarned}</td>
                            <td>
                                <input
                                onClick={() => handleTogglePaid(timePunch._id)}
                                type="checkbox" 
                                defaultChecked={timePunch.paid ? true : false} 
                                className="checkbox checkbox-success" />
                            </td>
                            <td>
                                {timePunch.hoursWorked} hours
                            </td>
                            <td
                                onClick={() => handleDelete(timePunch._id)}
                            >DEL</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table