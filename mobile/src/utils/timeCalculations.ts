/**
 * Time Calculation Utilities
 * Helper functions for calculating and formatting recovery time
 */

export interface TimeInRecovery {
  value: number | string;
  unit: 'days' | 'months' | 'years' | '';
  days: number;
  isMilestone: boolean;
}

/**
 * Parse a date string and create a local date object to avoid timezone issues
 */
function parseLocalDate(dateString: string): Date {
  // If it's in YYYY-MM-DD format, parse it as local date
  const dateParts = dateString.split('-');
  if (dateParts.length === 3) {
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
    const day = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }
  // Fallback to standard parsing
  return new Date(dateString);
}

/**
 * Calculate time in recovery from a start date
 */
export function calculateTimeInRecovery(recoveryDate: string): TimeInRecovery {
  const start = parseLocalDate(recoveryDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  let value: number | string;
  let unit: 'days' | 'months' | 'years' | '';
  let isMilestone = false;
  
  if (diffDays < 30) {
    value = diffDays;
    unit = 'days';
    isMilestone = diffDays === 1 || diffDays === 7 || diffDays === 14 || diffDays === 30;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    value = months;
    unit = months === 1 ? 'months' : 'months';
    isMilestone = months % 3 === 0;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const remainingMonths = Math.floor(remainingDays / 30);
    if (remainingMonths > 0) {
      value = `${years}y ${remainingMonths}m`;
      unit = '';
    } else {
      value = years;
      unit = years === 1 ? 'year' : 'years';
    }
    isMilestone = remainingMonths === 0;
  }
  
  return {
    value,
    unit,
    days: diffDays,
    isMilestone,
  };
}

/**
 * Format time in recovery as a string
 */
export function formatTimeInRecovery(
  recoveryDate: string,
  format: 'short' | 'long' | 'detailed' = 'short'
): string {
  const time = calculateTimeInRecovery(recoveryDate);
  
  if (format === 'short') {
    // For short format, if we have years with months, show the compact format
    if (typeof time.value === 'string' && time.value.includes('y')) {
      return time.value;
    }
    // Otherwise show value and unit
    return `${time.value} ${time.unit}`;
  }
  
  if (format === 'long') {
    if (time.unit === 'days') {
      return `${time.value} ${time.value === 1 ? 'day' : 'days'}`;
    } else if (time.unit === 'months') {
      return `${time.value} ${time.value === 1 ? 'month' : 'months'}`;
    } else if (time.unit === 'years') {
      return `${time.value} ${time.value === 1 ? 'year' : 'years'}`;
    }
    // Handle string values like "2y 3m"
    if (typeof time.value === 'string') {
      return time.value.replace('y', ' year').replace('m', ' month');
    }
    return String(time.value);
  }
  
  // detailed format
  const days = time.days;
  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  } else if (days < 365) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    if (remainingDays > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}, ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
    }
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  } else {
    const years = Math.floor(days / 365);
    const remainingDaysAfterYears = days % 365;
    const remainingMonths = Math.floor(remainingDaysAfterYears / 30);
    if (remainingMonths > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
}

