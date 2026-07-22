// Weather dashboard configuration constants and WMO weather codes

export const DEFAULT_CITY = "London";

export const QUICK_CITIES = [
  { name: "London", country: "GB" },
  { name: "New York", country: "US" },
  { name: "Tokyo", country: "JP" },
  { name: "Nairobi", country: "KE" },
  { name: "Paris", country: "FR" },
];

// WMO Weather Interpretation Codes mapping
export const WMO_CODE_MAP = {
  0: { description: "Clear Sky", category: "clear" },
  1: { description: "Mainly Clear", category: "clear" },
  2: { description: "Partly Cloudy", category: "cloudy" },
  3: { description: "Overcast", category: "cloudy" },
  45: { description: "Foggy", category: "fog" },
  48: { description: "Depositing Rime Fog", category: "fog" },
  51: { description: "Light Drizzle", category: "rain" },
  53: { description: "Moderate Drizzle", category: "rain" },
  55: { description: "Dense Drizzle", category: "rain" },
  61: { description: "Slight Rain", category: "rain" },
  63: { description: "Moderate Rain", category: "rain" },
  65: { description: "Heavy Rain", category: "rain" },
  71: { description: "Slight Snow", category: "snow" },
  73: { description: "Moderate Snow", category: "snow" },
  75: { description: "Heavy Snow", category: "snow" },
  80: { description: "Slight Rain Showers", category: "rain" },
  81: { description: "Moderate Rain Showers", category: "rain" },
  82: { description: "Violent Rain Showers", category: "storm" },
  95: { description: "Thunderstorm", category: "storm" },
  96: { description: "Thunderstorm with Hail", category: "storm" },
  99: { description: "Heavy Thunderstorm with Hail", category: "storm" },
};
