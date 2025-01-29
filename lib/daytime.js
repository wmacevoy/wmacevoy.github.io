// Ex: 7:30 am or 12:00 noon
export function formatTime(minutesSinceMidnight) {
    if (minutesSinceMidnight === 0) {
        return "12 Midnight";
    }
    if (minutesSinceMidnight === 12*60) {
        return "12 Noon";
    }

    const hours = Math.floor(minutesSinceMidnight / 60);
    const minutes = minutesSinceMidnight % 60;
  
    // Determine if it's AM or PM
    const period = hours >= 12 ? "PM" : "AM";
  
    // Adjust for 12-hour clock
    const displayHours = hours % 12 || 12;
          
    // Format minutes as two digits
    const displayMinutes = minutes.toString().padStart(2, "0");
  
    return `${displayHours}:${displayMinutes} ${period}`;
}

// inverse of formatTime
export function parseTime(timeString) {
    // Normalize input
    const normalized = timeString.trim().toLowerCase();

    // Extract time and period (am/pm)
    const timeRegex = /^(\d{1,2}):(\d{2})\s?(am|pm|noon|midnight)$/;
    const match = normalized.match(timeRegex);
  
    if (!match) {
        throw new Error(`Invalid time format '${timeString}'. Expected format: 'h:mm am/pm', '12:00 noon', or '12:00 midnight'.`);
    }
  
    const [, hourStr, minuteStr, period] = match;
    const hour = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
  
    if (hour < 1 || hour > 12 || minutes < 0 || minutes >= 60) {
      throw new Error("Invalid time values.");
    }
  
    if (period === "midnight" || period == "noon") {
        if (hour === 12 && minutes === 0) {
            return (period === "noon") ? 12*60 : 0;
        } else {
            throw new Error(`Invalid time format '${timeString}'. Expected format: 'h:mm am/pm', '12:00 noon', or '12:00 midnight'.`);
        }
    }

    // Convert to 24-hour time
    let totalMinutes = (hour % 12) * 60 + minutes; // Convert 12-hour clock to minutes
    if (period === "pm" && hour !== 12) totalMinutes += 12 * 60; // Add 12 hours for PM
    if (period === "am" && hour === 12) totalMinutes -= 12 * 60; // Handle 12:00 AM
  
    return totalMinutes;
}

export const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export function formatDay(dayOfWeek) {
    if (dayOfWeek < 1 || dayOfWeek > 7) {
        throw new Error(`Invalid day of week: '${dayOfWeek}'`);
    }
    return daysOfWeek[dayOfWeek-1];    
}

export function parseDay(day) {
    const Day = day.substring(0,1).toUpperCase()+day.substring(1).toLowerCase();
    let index = daysOfWeek.indexOf(Day);
    if (index >= 0) {
        return index + 1;
    }
    throw new Error(`Invalid day of week: ${day}`);
}
