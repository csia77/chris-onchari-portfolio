import { WMO_CODE_MAP } from './constants';

// Convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--';
  return Math.round((celsius * 9) / 5 + 32);
};

// Format temperature string based on unit
export const formatTemp = (celsius, unit = 'C') => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--°';
  const roundTemp = Math.round(celsius);
  if (unit === 'F') {
    return `${celsiusToFahrenheit(celsius)}°F`;
  }
  return `${roundTemp}°C`;
};

// Format ISO date string into short day name
export const formatDayName = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
  
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(adjustedDate);
};

// Format full current date
export const formatFullDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Lookup weather condition by code
export const getWeatherCondition = (code) => {
  const match = WMO_CODE_MAP[code];
  if (match) return match;
  
  return {
    description: "Clear",
    category: "clear"
  };
};
