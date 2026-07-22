import React from 'react';

/**
 * WeatherIcon Component
 * Renders minimalist SVG icons based on weather condition category.
 */
export const WeatherIcon = ({ category = 'clear', size = 32, className = '' }) => {
  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  };

  switch (category) {
    case 'cloudy':
      return (
        <svg {...iconProps}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...iconProps}>
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
          <path d="M8 19v2" />
          <path d="M12 19v2" />
          <path d="M16 19v2" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...iconProps}>
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <path d="M8 16h.01" />
          <path d="M8 20h.01" />
          <path d="M12 18h.01" />
          <path d="M16 16h.01" />
          <path d="M16 20h.01" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...iconProps}>
          <path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 3.5 14.5" />
          <path d="m13 12-3 5h4l-2 5" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...iconProps}>
          <path d="M4 14h16" />
          <path d="M4 18h16" />
          <path d="M4 10h16" />
        </svg>
      );
    case 'clear':
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M22 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
  }
};

export default WeatherIcon;
