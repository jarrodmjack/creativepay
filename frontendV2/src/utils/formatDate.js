export default function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(x => parseInt(x));
    const [time, timezone] = dateString.split("T")[1].split(".");
    const [hours, minutes, seconds] = time.split(":").map(x => parseInt(x));
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

