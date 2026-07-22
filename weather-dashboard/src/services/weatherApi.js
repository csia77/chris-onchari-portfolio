const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export class WeatherApiError extends Error {
  constructor(message, statusCode = null) {
    super(message);
    this.name = "WeatherApiError";
    this.statusCode = statusCode;
  }
}

// Search coordinates by city name
export const searchCityCoordinates = async (cityName) => {
  if (!cityName || !cityName.trim()) {
    throw new WeatherApiError("Please enter a valid city name.");
  }

  const sanitizedQuery = encodeURIComponent(cityName.trim());
  const url = `${GEOCODING_BASE_URL}?name=${sanitizedQuery}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new WeatherApiError(
        `Failed to find location data (status: ${response.status})`,
        response.status
      );
    }

    const data = await response.json();

    if (!data || !data.results || data.results.length === 0) {
      throw new WeatherApiError(`No location found for "${cityName}". Check spelling and try again.`);
    }

    const firstMatch = data.results[0];

    return {
      name: firstMatch.name,
      country: firstMatch.country || firstMatch.country_code || "",
      latitude: firstMatch.latitude,
      longitude: firstMatch.longitude,
      timezone: firstMatch.timezone || "auto",
    };
  } catch (error) {
    if (error instanceof WeatherApiError) throw error;
    throw new WeatherApiError("Unable to connect to location service. Check your network.");
  }
};

// Fetch current weather and forecast by coordinates
export const fetchWeatherData = async (latitude, longitude, timezone = "auto") => {
  const params = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: timezone,
    forecast_days: 6
  });

  const url = `${WEATHER_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new WeatherApiError(
        `Weather service error (status: ${response.status})`,
        response.status
      );
    }

    const data = await response.json();

    if (!data || !data.current || !data.daily) {
      throw new WeatherApiError("Invalid weather payload returned from server.");
    }

    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) throw error;
    throw new WeatherApiError("Failed to fetch weather forecast.");
  }
};

// Main function to fetch weather data for a city
export const getWeatherByCity = async (cityName) => {
  const cityInfo = await searchCityCoordinates(cityName);

  const rawWeather = await fetchWeatherData(
    cityInfo.latitude,
    cityInfo.longitude,
    cityInfo.timezone
  );

  const current = rawWeather.current || {};
  const daily = rawWeather.daily || {};

  const forecastList = (daily.time || [])
    .slice(1, 6)
    .map((dateStr, idx) => {
      const realIndex = idx + 1;
      return {
        id: `forecast-${dateStr}-${realIndex}`,
        date: dateStr,
        weatherCode: daily.weather_code?.[realIndex] ?? 0,
        tempMax: daily.temperature_2m_max?.[realIndex] ?? 0,
        tempMin: daily.temperature_2m_min?.[realIndex] ?? 0,
      };
    });

  return {
    city: cityInfo.name,
    country: cityInfo.country,
    coordinates: { lat: cityInfo.latitude, lon: cityInfo.longitude },
    current: {
      temperature: current.temperature_2m ?? 0,
      feelsLike: current.apparent_temperature ?? current.temperature_2m ?? 0,
      humidity: current.relative_humidity_2m ?? 0,
      windSpeed: current.wind_speed_10m ?? 0,
      pressure: current.surface_pressure ? Math.round(current.surface_pressure) : 1013,
      weatherCode: current.weather_code ?? 0,
      isDay: current.is_day === 1,
    },
    forecast: forecastList,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};
