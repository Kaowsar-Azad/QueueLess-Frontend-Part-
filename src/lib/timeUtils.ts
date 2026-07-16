export function formatTime(timeString?: string) {
  if (!timeString) return "";
  
  const [hourString, minute] = timeString.split(":");
  const hour = parseInt(hourString, 10);
  
  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // 0 becomes 12
  
  return `${formattedHour}:${minute} ${suffix}`;
}
