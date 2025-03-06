export function formatDate(timestamp) {
    const date = new Date(timestamp);

    // Function to get the ordinal suffix for the day
    function getOrdinal(day) {
        const suffix = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
        if (day >= 11 && day <= 13) {
            return day + 'th';
        }
        return day + suffix[day % 10] || 'th';
    }

    // Array of month names
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", 
        "September", "October", "November", "December"
    ];

    // Get formatted date
    const day = getOrdinal(date.getDate());
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    // Get time in 12-hour format with AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours to 12-hour format
    hours = hours % 12;
    if (hours === 0) hours = 12; // 12 AM or 12 PM (not 0)
    
    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine into the final string in the desired format
    return `${day} ${month} ${year} at ${hours}:${formattedMinutes} ${ampm}`;
}