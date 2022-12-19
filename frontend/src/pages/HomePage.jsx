import React from 'react'
import Table from '../components/Table'
import { useEffect } from 'react'

const HomePage = () => {


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/home', {
                method: "GET"
            })
            const data = await response.json()
            console.log('data: ', data)
        }
        fetchData()
    })

    return (
        <div>
            <div>
                <Table
                //  employee={}
                //  date={}
                //  location={}
                //  timeStart={}
                //  timeEnd={}
                //  total={}
                />
            </div>
        </div>
    )
}

export default HomePage