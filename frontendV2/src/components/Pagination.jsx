const Pagination = ({timepunchesPerPage, totalTimePunches, paginate, currentPage}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalTimePunches / timepunchesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div className="btn-group my-10 w-full flex justify-center">
            {pageNumbers.map((number, i) => (
                <button onClick={() => paginate(number)} key={i} className={`btn ${currentPage === number ? 'btn-accent' : ''}`}>{number}</button>
            ))}
        </div>
    )
}

export default Pagination