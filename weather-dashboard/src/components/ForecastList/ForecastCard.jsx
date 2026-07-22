import React from 'react';
import { formatTemp, getWeatherCondition, formatDayName } from '../../utils/formatters';
import { WeatherIcon } from '../WeatherIcon';
import styles from './ForecastList.module.css';

export const ForecastCard = ({ dayData, unit }) => {
  const { date, weatherCode, tempMax, tempMin } = dayData;
  const condition = getWeatherCondition(weatherCode);
  const dayName = formatDayName(date);

  return (
    <div className={styles.forecastCard}>
      <span className={styles.dayName}>{dayName}</span>
      <span className={styles.dateLabel}>{date}</span>
      
      <div className={styles.icon}>
        <WeatherIcon category={condition.category} size={36} />
      </div>

      <span className={styles.conditionDesc}>{condition.description}</span>

      <div className={styles.tempRange}>
        <span className={styles.maxTemp}>{formatTemp(tempMax, unit)}</span>
        <span className={styles.minTemp}>{formatTemp(tempMin, unit)}</span>
      </div>
    </div>
  );
};
