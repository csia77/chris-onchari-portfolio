import React from 'react';
import { formatTemp, getWeatherCondition } from '../../utils/formatters';
import { WeatherIcon } from '../WeatherIcon';
import styles from './WeatherCard.module.css';

export const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const { city, country, current, lastUpdated } = data;
  const condition = getWeatherCondition(current?.weatherCode);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.cityName}>
            {city}
            {country && <span className={styles.countryBadge}>{country}</span>}
          </h2>
          <p className={styles.lastUpdated}>Updated at {lastUpdated || 'Just now'}</p>
        </div>
        <div className={styles.weatherIcon}>
          <WeatherIcon category={condition.category} size={64} />
        </div>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.tempContainer}>
          <span className={styles.temperature}>
            {formatTemp(current?.temperature, unit)}
          </span>
          <span className={styles.conditionText}>{condition.description}</span>
        </div>

        <div className={styles.feelsLikeBadge}>
          Feels like {formatTemp(current?.feelsLike, unit)}
        </div>
      </div>
    </div>
  );
};
