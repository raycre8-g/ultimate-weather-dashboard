import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  // Check if weatherData is defined before destructuring
  if (!weatherData) {
    return null; // Return null if weatherData is undefined
  }

  // Destructure weatherData safely after checking it is not undefined
  const { city, temperature, condition, icon, wind, humidity, feelsLike } = weatherData;

  return (
    <div className="text-center mt-8">
      <div className="flex justify-center items-center">
        <img src={icon} alt="Weather Icon" className="h-16 w-auto mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{city}</h2>
          <p className="text-xl">{condition}</p>
          <p className="text-5xl font-bold">{Math.round(temperature)}°C</p>
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-8">
        <p>Feels like: {Math.round(feelsLike)}°C</p>
        <p>Wind: {wind} kph</p>
        <p>Humidity: {humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
