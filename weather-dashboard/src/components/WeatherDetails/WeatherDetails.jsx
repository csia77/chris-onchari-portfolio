import React from 'react';
import { formatTemp } from '../../utils/formatters';
import styles from './WeatherDetails.module.css';

export const WeatherDetails = ({ current, unit }) => {
  if (!current) return null;

  const detailItems = [
    {
      id: 'feels-like',
      label: 'Feels Like',
      value: formatTemp(current.feelsLike, unit),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        </svg>
      )
    },
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${current.humidity}%`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    },
    {
      id: 'wind-speed',
      label: 'Wind Speed',
      value: `${current.windSpeed} km/h`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
          <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
        </svg>
      )
    },
    {
      id: 'pressure',
      label: 'Air Pressure',
      value: `${current.pressure} hPa`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    }
  ];

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Weather Details</h3>
      <div className={styles.grid}>
        {detailItems.map((item) => (
          <div key={item.id} className={styles.detailCard}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
