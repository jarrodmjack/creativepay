import React from 'react'

const EmployeeTotals = ({ timePunches, filterDates }) => {

  const totalPaid = timePunches.reduce((acc, c) => acc + Number(c.totalEarned), 0)
  const totalHoursWorked = timePunches.reduce((acc, c) => acc + Number(c.hoursWorked), 0)
  const fromDate = filterDates.fromDate
  const toDate = filterDates.toDate

  return (
    <div className='flex justify-between text-3xl font-bold'>
      <span>Total paid: ${totalPaid}</span>
      {fromDate && toDate && <span className='text-2xl font-normal'>Time Period: {fromDate} to {toDate}</span>}
      <span>Total hours worked: {totalHoursWorked}</span>
    </div>

  )
}

export default EmployeeTotals