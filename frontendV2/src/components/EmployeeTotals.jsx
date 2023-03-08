import React from 'react'

const TotalPaidOutToEmployees = ({ timePunches }) => {

  const totalPaid = timePunches.reduce((acc, c) => acc + Number(c.totalEarned), 0)
  const totalHoursWorked = timePunches.reduce((acc, c) => acc + Number(c.hoursWorked), 0)

  return (
    <div className='flex justify-between'>
      <span className='text-3xl font-bold'>Total paid: ${totalPaid}</span>
      <span className='text-3xl font-bold'>Total hours worked: {totalHoursWorked}</span>
    </div>

  )
}

export default TotalPaidOutToEmployees