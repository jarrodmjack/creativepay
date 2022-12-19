import { useEffect } from "react"


const Table = () => {

    useEffect(() => {
        const fetchTimePunches = async () => {
            const response = await fetch('/api/punch', {
                method: "GET"
            })
            const data = await response.json()
            console.log('punches ', data)
        }
        fetchTimePunches()
    })

    return (
        <div className="overflow-x-auto">
            <table className="table w-full ">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Time Start</th>
                        <th>Time End</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover cursor-pointer">
                        <td>Cy Ganderton</td>
                        <td>Nov 8th</td>
                        <td>Office</td>
                        <td>9:00AM</td>
                        <td>4:30PM</td>
                        <td>$142</td>
                    </tr>
                    <tr className="hover cursor-pointer">
                        <td>Cy Ganderton</td>
                        <td>Nov 8th</td>
                        <td>Office</td>
                        <td>9:00AM</td>
                        <td>4:30PM</td>
                        <td>$142</td>
                    </tr>
                    <tr className="hover cursor-pointer">
                        <td>Cy Ganderton</td>
                        <td>Nov 8th</td>
                        <td>Office</td>
                        <td>9:00AM</td>
                        <td>4:30PM</td>
                        <td>$142</td>
                    </tr>
                    <tr className="hover cursor-pointer">
                        <td>Cy Ganderton</td>
                        <td>Nov 8th</td>
                        <td>Office</td>
                        <td>9:00AM</td>
                        <td>4:30PM</td>
                        <td>$142</td>
                    </tr>
                    <tr className="hover cursor-pointer">
                        <td>Cy Ganderton</td>
                        <td>Nov 8th</td>
                        <td>Office</td>
                        <td>9:00AM</td>
                        <td>4:30PM</td>
                        <td>$142</td>
                    </tr>
                    <tr className="hover cursor-pointer">
                        <td>Cy Ganderton</td>
                        <td>Nov 8th</td>
                        <td>Office</td>
                        <td>9:00AM</td>
                        <td>4:30PM</td>
                        <td>$142</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table