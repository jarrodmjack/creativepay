import React from 'react'
import formatTime from "../../utils/formatTime"
import formatDate from "../../utils/formatDate"
import TrashIcon from "../../icons/TrashIcon"

const TimePunchTableRow = ({ index, timePunch, handleDelete, togglePaid }) => {

    return (
        <tr className="cursor-pointer">
            <td>{timePunch.employeeName}</td>
            <td>{formatDate(timePunch.date)}</td>
            <td>{timePunch.location}</td>
            <td>{formatTime(timePunch.timeStart)}</td>
            <td>{formatTime(timePunch.timeEnd)}</td>
            <td>${timePunch.totalEarned}</td>
            <td>
                <input
                    onChange={() => togglePaid(timePunch._id, index)}
                    type="checkbox"
                    checked={timePunch.paid}
                    className="checkbox checkbox-success" />
            </td>
            <td>
                {timePunch.hoursWorked} hours
            </td>
            <td
                onClick={() => handleDelete(timePunch._id)}
            ><TrashIcon /></td>
        </tr>
    )
}

export default TimePunchTableRow