import React from 'react'
import TimePunchTable from '../components/table/TimePunchTable';
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from "react-router-dom";

const HomePage = () => {

    const { user } = useAuthContext()
    const [timePunches, setTimePunches] = useState([])

    useEffect(() => {
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
        fetchTimePunches()
    }, [])

    return (
        <div className='flex flex-col p-10 gap-4 container mx-auto'>
            {timePunches.length > 0 && (
                <div>
                    <TimePunchTable
                        timePunches={timePunches}
                    />
                </div>
            )}

        </div>
    )
}

export default HomePage