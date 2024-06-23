export function convertToHours(timeString: string) {
    const [days, time] = timeString.split(' ');
    // Split the time string into components
    const [hours, minutes, seconds] = time.split(':').map(Number);
    // Convert the components to hours
    const totalHours = hours + minutes / 60 + seconds / 3600;
    return Number(days) * 24 + totalHours;
}