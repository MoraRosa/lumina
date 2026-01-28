/**
 * Utility functions for formatting dates and calculating relative time
 */

/**
 * Calculate the relative time from a given date to today
 * @param dateString - Date in format "YYYY-MM-DD"
 * @returns Formatted relative time string (e.g., "today", "2 days ago", "3 months ago")
 */
export const getRelativeTime = (dateString: string): string => {
  const reviewDate = new Date(dateString);
  const today = new Date();
  
  // Reset time to midnight for accurate day comparison
  reviewDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - reviewDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Handle future dates (shouldn't happen, but just in case)
  if (diffDays < 0) {
    return formatDate(dateString);
  }
  
  // Today
  if (diffDays === 0) {
    return "today";
  }
  
  // Yesterday
  if (diffDays === 1) {
    return "yesterday";
  }
  
  // Less than a week
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  
  // Less than a month (4 weeks)
  if (diffDays < 28) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  
  // Less than a year
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  
  // Years
  const years = Math.floor(diffDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};

/**
 * Format a date string to a readable format
 * @param dateString - Date in format "YYYY-MM-DD"
 * @returns Formatted date string (e.g., "January 28, 2026")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format a date string to a short format
 * @param dateString - Date in format "YYYY-MM-DD"
 * @returns Formatted date string (e.g., "Jan 28, 2026")
 */
export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

