import React from 'react';
import { ForecastCard } from './ForecastCard';
import styles from './ForecastList.module.css';

/**
 * ForecastList Component
 * Renders multi-day forecast grid.
 * Demonstrates: Array mapping (`forecast.map`), key prop usage, clean list rendering.
 */
export const ForecastList = ({ forecast, unit }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>5-Day Weather Forecast</h3>
      <div className={styles.forecastGrid}>
        {forecast.map((dayData) => (
          <ForecastCard key={dayData.id || dayData.date} dayData={dayData} unit={unit} />
        ))}
      </div>
    </div>
  );
};
