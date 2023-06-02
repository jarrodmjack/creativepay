import React, { useState } from 'react'

const TableOptions = ({ handlePrint, handleFilterTimePunches, handleResetFilter }) => {

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  return (
    <div className='flex flex-col gap-4'>
      <span className='text-2xl font-semibold'>Filter by date</span>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleFilterTimePunches(fromDate, toDate)
      }}>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-10'>
            <div className='flex flex-col'>
              <label>From</label>
              <input
                required
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
                value={fromDate}
              />
            </div>
            <div className='flex flex-col'>
              <label>To</label>
              <input
                required
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                value={toDate}
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <button
              type='submit'
              className="btn btn-success w-40"
            >Apply filter
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleResetFilter()
                setFromDate('')
                setToDate('')
              }}
              className='btn btn-accent w-40'>
              Reset Filter
            </button>
          </div>
        </div>
      </form>
      <div className='flex justify-end'>
        <button
          onClick={handlePrint}
          className='btn btn-secondary w-40'>
          Print table
        </button>
      </div>
    </div>
  )
}

export default TableOptions