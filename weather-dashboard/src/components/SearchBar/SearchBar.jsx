import React, { useState } from 'react';
import { QUICK_CITIES } from '../../utils/constants';
import styles from './SearchBar.module.css';

export const SearchBar = ({ onSearch, onClear, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleChipClick = (cityName) => {
    setSearchTerm(cityName);
    onSearch(cityName);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onClear) onClear();
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search city (e.g. London, Tokyo, Nairobi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
            aria-label="City search input"
          />

          {searchTerm && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear input"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading || !searchTerm.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className={styles.quickChips}>
        <span className={styles.quickLabel}>Popular:</span>
        <div className={styles.chipList}>
          {QUICK_CITIES.map((city) => (
            <button
              key={city.name}
              type="button"
              className={styles.chip}
              onClick={() => handleChipClick(city.name)}
              disabled={isLoading}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
