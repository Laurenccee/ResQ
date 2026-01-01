// src/utils/timeUtils.js

// Get current date & time
export const getCurrentDateTime = () => {
  return new Date();
};

// Format time (HH:MM:SS)
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString();
};

// Format date
export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const formatCustomDate = (date: Date) => {
  const weekday = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const day = date.toLocaleDateString("en-US", {
    day: "2-digit",
  });

  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  return `${weekday}, ${day} ${month}`.toUpperCase();
};

// Add minutes to a time
export const addMinutes = (date: Date, minutes: number) => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};

// Add hours
export const addHours = (date: Date, hours: number) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
};

// Get timestamp (for logs)
export const getTimestamp = () => {
  return Date.now();
};
