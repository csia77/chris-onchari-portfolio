import React from 'react';
import styles from './LoadingState.module.css';

/**
 * LoadingState Component
 * Displays a pulse skeleton loader while API requests are pending.
 * Demonstrates clean UX loading states in modern single-page apps.
 */
export const LoadingState = () => {
  return (
    <div className={styles.loadingContainer} aria-label="Loading weather data">
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Fetching latest weather data...</p>
      </div>

      {/* Hero Card Skeleton */}
      <div className={`${styles.skeleton} ${styles.heroSkeleton}`}></div>

      {/* Metrics Grid Skeleton */}
      <div className={styles.gridSkeleton}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`${styles.skeleton} ${styles.cardSkeleton}`}></div>
        ))}
      </div>
    </div>
  );
};
