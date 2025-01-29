// Ex: 7:30 AM or 12:00 Noon
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

// Returns the total number of minutes from midnight based on a given time string.
//
// Examples:
//   parseTime("noon")            -> 720 (12 * 60)
//   parseTime("midnight")        -> 0
//   parseTime("8:30 pm")         -> 20:30 in 24-hr => 20 * 60 + 30 = 1230
//   parseTime("8 pm")            -> 20:00 => 1200
//   parseTime("13:15")           -> 13 * 60 + 15 = 795
//   parseTime("13")              -> 13 * 60 + 0 = 780
//   parseTime("12:00 noon")      -> 720
//   parseTime("12:00 midnight")  -> 0
//   parseTime("8:00 am")         -> 8 * 60 + 0 = 480
export function parseTime(timeString) {
    if (!timeString || typeof timeString !== "string") {
      throw new Error("Time must be a non-empty string.");
    }
  
    const normalized = timeString.trim().toLowerCase();
  
    // Quick checks for "noon" and "midnight" keywords (some users might type those directly).
    if (normalized === "noon") {
      return 12 * 60;  // 12:00
    }
    if (normalized === "midnight") {
      return 0;        // 00:00
    }
  
    // Also allow "12:00 noon" or "12:00 midnight"
    // Let's separate that out, but it can also be handled below by the 12-hour pattern.
    if (normalized === "12:00 noon") {
      return 12 * 60;
    }
    if (normalized === "12:00 midnight") {
      return 0;
    }
  
    //
    // 1) Check for 12-hour format with optional minutes and am/pm
    //
    //    Examples: "8 am", "8:30 pm", "12 pm", "12:01 am"
    //
    // Explanation of the regex:
    //   ^(\d{1,2})(?::(\d{1,2}))?    -> capture hour (1-2 digits), optional colon+minutes
    //   \s?                          -> optional whitespace
    //   (am|pm)$                     -> match exactly am or pm at the end (captured group)
    //
    let match = normalized.match(/^(\d{1,2})(?::(\d{1,2}))?\s?(am|pm)$/);
    if (match) {
      let [, hourStr, minuteStr, ampm] = match;
      let hour = parseInt(hourStr, 10);
      let minutes = minuteStr ? parseInt(minuteStr, 10) : 0;
  
      // Basic validation for 12-hour clock.
      if (hour < 1 || hour > 12 || minutes < 0 || minutes >= 60) {
        throw new Error(`Invalid 12-hour time: '${timeString}'`);
      }
  
      // Convert 12-hour to 24-hour in minutes from midnight.
      // 12 am -> hour = 0
      // 12 pm -> hour = 12
      // any other pm -> hour + 12
      if (ampm === "am") {
        if (hour === 12) {
          hour = 0;
        }
      } else { // pm
        if (hour !== 12) {
          hour += 12;
        }
      }
  
      return hour * 60 + minutes;
    }
  
    //
    // 2) Check for 24-hour format with optional minutes (0–23 : 0–59)
    //
    //    Examples: "13:15", "8:05", "8", "0:30", "23", "23:59"
    //
    // Explanation of the regex:
    //   ^(\d{1,2})(?::(\d{1,2}))?$  -> capture hour (1-2 digits) and optional minutes
    //
    match = normalized.match(/^(\d{1,2})(?::(\d{1,2}))?$/);
    if (match) {
      let [, hourStr, minuteStr] = match;
      let hour = parseInt(hourStr, 10);
      let minutes = minuteStr ? parseInt(minuteStr, 10) : 0;
  
      if (hour < 0 || hour > 23 || minutes < 0 || minutes >= 60) {
        throw new Error(`Invalid 24-hour time: '${timeString}'`);
      }
  
      return hour * 60 + minutes;
    }
  
    // If none of the above matched, we consider it invalid input.
    throw new Error(
      `Invalid time format '${timeString}'.\n` +
      `Expected one of:\n` +
      ` - 12-hour (e.g., "8 am", "8:30 pm")\n` +
      ` - "noon"/"midnight"\n` +
      ` - 24-hour (e.g., "13:15", "13")`
    );
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
