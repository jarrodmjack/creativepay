export default function formatDate(date) {
    const punchDate = new Date(String(date))
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(punchDate);
    return formattedDate
}