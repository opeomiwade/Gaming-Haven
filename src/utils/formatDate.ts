function formatDateTime(date: Date) {
  date = new Date(date);
  // Extract the day, month, year, hour, and minute
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear() % 100; // Get last two digits of the year
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the day and month to be always two digits
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedYear = year.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const formattedDateTime = `${formattedDay}/${formattedMonth}/${formattedYear} at ${formattedHours}:${formattedMinutes}`;
  return formattedDateTime;
}

export default formatDateTime;
