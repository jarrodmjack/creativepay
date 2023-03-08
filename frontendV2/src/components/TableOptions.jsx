import React, { useState } from 'react'

const TableOptions = ({ handlePrint, handleFilterTimePunches }) => {

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  return (
    <div className='flex flex-col gap-4 w-1/2'>
      <form onSubmit={(e) => handleFilterTimePunches(e, fromDate, toDate)}>
        <div className='flex items-center'>
          <div className='flex flex-col w-fit'>
            <label>From</label>
            <input
              required
              type="date"
              onChange={(e) => setFromDate(e.target.value)}
              value={fromDate}
            />
          </div>
          <div className='flex flex-col w-fit'>
            <label>To</label>
            <input
              required
              type="date"
              onChange={(e) => setToDate(e.target.value)}
              value={toDate}
            />
          </div>
          <button type='submit' className="btn btn-secondary">Apply filter</button>
        </div>
      </form>
      <button
        onClick={handlePrint}
        className='btn btn-secondary w-1/3 self-center'>
        Print table
      </button>
    </div>
  )
}

export default TableOptions