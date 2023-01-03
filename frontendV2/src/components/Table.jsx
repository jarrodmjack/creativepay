import { useEffect, useState } from "react"
import formatTime from "../utils/formatTime"
import formatDate from "../utils/formatDate"

const Table = ({ timePunches, handleDelete }) => {

    console.log(timePunches)
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