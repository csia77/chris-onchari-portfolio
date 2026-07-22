import React from 'react';
import styles from './ErrorState.module.css';

export const ErrorState = ({ errorMessage, onRetry }) => {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.iconWrapper}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h3 className={styles.title}>Unable to load weather</h3>
      <p className={styles.message}>
        {errorMessage || "An error occurred while fetching weather data."}
      </p>

      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
