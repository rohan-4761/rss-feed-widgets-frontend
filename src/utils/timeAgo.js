function timeAgo(dateString) {
  const dateParts = dateString.split(/[- :]/);
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JavaScript Date
  const day = parseInt(dateParts[2]);
  const hour = parseInt(dateParts[3]);
  const minute = parseInt(dateParts[4]);
  const second = parseInt(dateParts[5]);

  const pastDate = new Date(year, month, day, hour, minute, second);
  const now = new Date();
  const seconds = Math.floor((new Date() - pastDate) / 1000);

  if (seconds < 60) {
    return seconds === 0
      ? "just now"
      : `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    // Approximation for month
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30); // Approximation for month
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

export default timeAgo;
