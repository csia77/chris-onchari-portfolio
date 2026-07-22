# WeatherPulse - Weather Dashboard

A responsive weather dashboard application built with React.js and the Open-Meteo REST API. The app allows users to search for weather by city name, view current metrics, and check 5-day forecasts.

## Features

- **City Search & Quick Select**: Search for any city or click on popular quick-select cities.
- **Current Weather Conditions**: View current temperature, weather description, location country, and feels-like temperature.
- **Detailed Metrics**: Displays humidity, wind speed, air pressure, and feels-like status.
- **5-Day Forecast**: Multi-day forecast displaying daily high/low temperature ranges and conditions.
- **Theme & Unit Toggles**: Switch between Celsius (°C) and Fahrenheit (°F), as well as Light and Dark mode.
- **State Handling**: Loading skeletons during API calls, user-friendly error alerts with retry option, and empty state support.

## Tech Stack

- **Frontend**: React.js (Functional components, hooks)
- **Build Tool**: Vite
- **Styling**: CSS Modules with CSS custom properties
- **Data Source**: Open-Meteo REST API (Geocoding & Forecast)

## Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── Header/             # App header, unit and theme toggles
│   │   ├── SearchBar/          # Search input form and quick city chips
│   │   ├── WeatherCard/        # Current weather card
│   │   ├── WeatherDetails/     # Weather metrics grid
│   │   ├── ForecastList/       # 5-day forecast cards
│   │   ├── LoadingState/       # Skeleton loading animation
│   │   ├── ErrorState/         # Error message display
│   │   ├── EmptyState/         # Empty search prompt
│   │   └── WeatherIcon.jsx     # SVG weather icons
│   ├── services/
│   │   └── weatherApi.js       # REST API service for geocoding and forecast data
│   ├── utils/
│   │   ├── formatters.js       # Helper functions for dates, temperature, weather codes
│   │   └── constants.js        # Default city list and condition maps
│   ├── styles/
│   │   ├── variables.css       # Design tokens and theme colors
│   │   └── global.css          # CSS resets and typography
│   ├── App.jsx                 # App layout and state controller
│   └── main.jsx                # Entry point
├── vercel.json                 # Vercel deployment config
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd weather-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`.

### Building for Production

To build the project for production:
```bash
npm run build
```

The output files will be created in the `dist` directory.

## Deployment to Vercel

Using Vercel CLI:
```bash
vercel
```

Or connect the repository to your Vercel account via the Vercel dashboard.

## React Concepts Demonstrated

- **Hooks**: Used `useState` for component state and `useEffect` for handling side effects like fetching data and applying theme changes. `useCallback` is used to memoize API calls.
- **Component Architecture**: Separated UI presentation components from state management and API logic.
- **Controlled Components**: Form inputs are managed through React state.
- **Conditional Rendering**: Rendered loading, error, empty, and data views based on app state.
- **Props**: Passed data and callback functions down component trees cleanly.

## REST API & JSON Integration

The application integrates with the Open-Meteo REST API using native `fetch` and `async/await`.

1. **Geocoding Search**: Resolves a city name input to latitude and longitude coordinates.
2. **Forecast Fetching**: Queries current weather metrics and 5-day forecast data using the coordinates.
3. **Data Normalization**: Transforms the raw JSON response into a consistent data structure used across components.

## How to Explain This Project in an Interview

### Project Summary

"I built WeatherPulse, a weather dashboard using React and the Open-Meteo REST API. It allows users to search for weather by city name, view current metrics like humidity and wind speed, and check a 5-day forecast. I structured the project by separating the API layer from UI components, implemented defensive data handling, added loading and error states, and built dark mode and temperature unit toggles."

### Common Technical Questions

- **Why React?**
  React's component model made it straightforward to break the dashboard into reusable parts. Using hooks like `useState` and `useEffect` kept state management clean when handling API updates.

- **How is API data handled?**
  API requests are isolated in `services/weatherApi.js`. It performs two sequential requests (geocoding then weather forecast) and transforms the JSON payload into a clean format before updating state in `App.jsx`.

- **How are loading and error states handled?**
  State variables `isLoading` and `error` track request status. When a request starts, `isLoading` triggers a skeleton loader. If the request fails, a `try/catch` block updates the `error` state to display an error component with a retry option.

- **Future Improvements**:
  Adding debounced search input, caching recent searches in localStorage, and adding browser geolocation support.
