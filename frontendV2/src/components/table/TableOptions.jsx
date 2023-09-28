import React, { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"

const TableOptions = ({
	handlePrint,
	handleFilterTimePunches,
	handleResetFilter,
}) => {
	const { user } = useAuthContext()
	const [fromDate, setFromDate] = useState("")
	const [toDate, setToDate] = useState("")
	const [employeeList, setEmployeeList] = useState([])
	const [employeeFilter, setEmployeeFilter] = useState("")

	useEffect(() => {
		const fetchEmployeeList = async () => {
			const response = await fetch("/api/home/", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			const data = await response.json()
			setEmployeeList(data)
		}
		fetchEmployeeList()
	}, [])

	return (
		<div className="flex flex-col gap-4">
			<div>
				<span className="text-2xl font-semibold">
					Filter by date and employee
				</span>
				<form
					className="border p-4"
					onSubmit={(e) => {
						e.preventDefault()
						handleFilterTimePunches(
							fromDate,
							toDate,
							employeeFilter
						)
					}}
				>
					<div className="flex flex-col gap-4">
						<div className="flex gap-10">
							<div className="flex flex-col">
								<label>From</label>
								<input
									required
									type="date"
									onChange={(e) =>
										setFromDate(e.target.value)
									}
									value={fromDate}
								/>
							</div>
							<div className="flex flex-col">
								<label>To</label>
								<input
									required
									type="date"
									onChange={(e) => setToDate(e.target.value)}
									value={toDate}
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="">Employee</label>
								<select
									required
									className=""
									onChange={(e) =>
										setEmployeeFilter(e.target.value)
									}
								>
									<option disabled selected>
										Employee Name
									</option>
									{employeeList &&
										employeeList.map((employee, i) => (
											<option key={i}>
												{employee.name}
											</option>
										))}
								</select>
							</div>
						</div>
						<div className="flex gap-4">
							<button
								type="submit"
								className="btn btn-success w-40"
							>
								Apply filter
							</button>
							<button
								onClick={(e) => {
									e.preventDefault()
									handleResetFilter()
									setEmployeeFilter("")
									setFromDate("")
									setToDate("")
								}}
								className="btn btn-accent w-40"
							>
								Reset Filter
							</button>
						</div>
					</div>
				</form>
			</div>
			<div className="flex justify-end">
				<button
					onClick={handlePrint}
					className="btn btn-secondary w-40"
				>
					Print table
				</button>
			</div>
		</div>
	)
}

export default TableOptions
