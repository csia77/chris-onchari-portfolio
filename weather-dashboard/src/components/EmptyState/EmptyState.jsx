import React from 'react';
import styles from './EmptyState.module.css';

export const EmptyState = ({ onSelectDefault }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </div>

      <h3 className={styles.title}>No Location Selected</h3>
      <p className={styles.subtitle}>
        Search for a city above or choose one of the popular cities to view current weather and forecast.
      </p>

      {onSelectDefault && (
        <button
          type="button"
          className={styles.defaultBtn}
          onClick={onSelectDefault}
        >
          View Weather in London
        </button>
      )}
    </div>
  );
};
