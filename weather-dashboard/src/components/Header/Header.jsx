import React from 'react';
import { formatFullDate } from '../../utils/formatters';
import styles from './Header.module.css';

export const Header = ({ unit, onToggleUnit, theme, onToggleTheme }) => {
  const currentDate = formatFullDate();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        </div>
        <div>
          <h1 className={styles.title}>WeatherPulse</h1>
          <p className={styles.subtitle}>{currentDate}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={onToggleUnit}
          aria-label="Toggle Temperature Unit"
        >
          <span className={unit === 'C' ? styles.activeUnit : ''}>°C</span>
          <span className={styles.divider}>/</span>
          <span className={unit === 'F' ? styles.activeUnit : ''}>°F</span>
        </button>

        <button
          type="button"
          className={styles.themeBtn}
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
};
