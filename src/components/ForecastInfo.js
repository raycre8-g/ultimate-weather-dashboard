import React from 'react';

// Function to convert date string to weekday name
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
};

const ForecastInfo = ({ forecastData }) => {
  if (!forecastData) {
    console.log('No forecast data available'); // Debug log
    return null; // Return nothing if forecastData is undefined
  }

  return (
    <div className="mt-8 bg-transparent p-4 md:p-6 rounded-lg backdrop-blur-sm w-full md:w-[50%]">
      <h2 className="text-lg md:text-2xl font-bold text-center mb-4">3-Day Forecast</h2>
      <div className="flex flex-row flex-wrap justify-center md:justify-between gap-2 md:gap-6">
        {forecastData.map((day, index) => (
          <div key={index} className="flex flex-col items-center mb-4 md:mb-0">
            <p className="text-sm md:text-lg font-bold">{getDayOfWeek(day.date)}</p> {/* Convert date to weekday name */}
            <img src={`https:${day.day.condition.icon}`} alt="Weather Icon" className="h-12 w-12 md:h-16 md:w-16" />
            <p className="text-xs md:text-base">{day.day.condition.text}</p>
            <p className="text-xs md:text-base">High: {Math.round(day.day.maxtemp_c)}°C</p>
            <p className="text-xs md:text-base">Low: {Math.round(day.day.mintemp_c)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastInfo;
