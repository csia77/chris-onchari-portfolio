import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { WeatherDetails } from './components/WeatherDetails/WeatherDetails';
import { ForecastList } from './components/ForecastList/ForecastList';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ErrorState } from './components/ErrorState/ErrorState';
import { EmptyState } from './components/EmptyState/EmptyState';

import { getWeatherByCity } from './services/weatherApi';
import { DEFAULT_CITY } from './utils/constants';
import styles from './App.module.css';

export function App() {
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [theme, setTheme] = useState('light');

  // Handle theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch weather data for city
  const handleFetchWeather = useCallback(async (cityName) => {
    if (!cityName) {
      setWeatherData(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(cityName);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to load weather data.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (currentCity) {
      handleFetchWeather(currentCity);
    }
  }, [currentCity, handleFetchWeather]);

  const handleSearchSubmit = (newCity) => {
    setCurrentCity(newCity);
  };

  const handleClearSearch = () => {
    setCurrentCity('');
    setWeatherData(null);
    setError(null);
  };

  const handleToggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleRetry = () => {
    if (currentCity) {
      handleFetchWeather(currentCity);
    } else {
      setCurrentCity(DEFAULT_CITY);
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.dashboardCard}>
        <Header
          unit={unit}
          onToggleUnit={handleToggleUnit}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <SearchBar
          onSearch={handleSearchSubmit}
          onClear={handleClearSearch}
          isLoading={isLoading}
        />

        <main className={styles.mainContent}>
          {isLoading && <LoadingState />}

          {!isLoading && error && (
            <ErrorState errorMessage={error} onRetry={handleRetry} />
          )}

          {!isLoading && !error && !currentCity && (
            <EmptyState onSelectDefault={() => setCurrentCity(DEFAULT_CITY)} />
          )}

          {!isLoading && !error && weatherData && (
            <>
              <WeatherCard data={weatherData} unit={unit} />
              <WeatherDetails current={weatherData.current} unit={unit} />
              <ForecastList forecast={weatherData.forecast} unit={unit} />
            </>
          )}
        </main>

        <footer className={styles.footer}>
          <p>WeatherPulse Dashboard • Data provided by Open-Meteo REST API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
