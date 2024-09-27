import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import WeatherInfo from '../components/WeatherInfo'; // Component to display weather info
import ForecastInfo from '../components/ForecastInfo'; // New component to display forecast
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // State for 3-day forecast
  const [backgroundVideo, setBackgroundVideo] = useState('/videos/clear-sky.mp4'); // Default video
  const [loading, setLoading] = useState(false); // State to manage loading

  // Function to fetch weather data from OpenWeatherMap
  const fetchFromOpenWeatherMap = async (city) => {
    const apiKey = '5cb0145f86d88ba9ea2ea1d25fd84656'; // Your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    setLoading(true); // Set loading to true when starting the fetch

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === 200) {
        updateWeatherData(data);
      } else {
        console.error('OpenWeatherMap API error:', data.message);
        throw new Error('City not found or OpenWeatherMap API error');
      }
    } catch (error) {
      console.error('Error fetching data from OpenWeatherMap:', error);
      setLoading(false); // Set loading to false on error
      return false; // Indicate failure
    }
    setLoading(false); // Set loading to false after fetching is done
    return true; // Indicate success
  };

  // Function to fetch current weather data from WeatherAPI
  const fetchCurrentWeatherFromWeatherAPI = async (city) => {
    const apiKey = '18b8e38902d445ac801222954242608'; // Your WeatherAPI key

    const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    setLoading(true); // Set loading to true when starting the fetch

    try {
      const response = await fetch(currentWeatherUrl);
      const data = await response.json();

      if (response.ok) {
        updateWeatherData(data, true); // Update weather data with WeatherAPI data
      } else {
        console.error('WeatherAPI API error:', data.error?.message);
        throw new Error('City not found or WeatherAPI API error');
      }
    } catch (error) {
      console.error('Error fetching current weather data from WeatherAPI:', error);
      setLoading(false); // Set loading to false on error
      return false; // Indicate failure
    }
    setLoading(false); // Set loading to false after fetching is done
    return true; // Indicate success
  };

  // Function to fetch 3-day forecast from WeatherAPI
  const fetchForecastFromWeatherAPI = async (city) => {
    const apiKey = '18b8e38902d445ac801222954242608'; // Your WeatherAPI key

    // Fetch 3-day forecast data
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

    setLoading(true); // Set loading to true when starting the fetch

    try {
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (forecastResponse.ok) {
        updateForecastData(forecastData.forecast.forecastday); // Update forecast data
      } else {
        console.error('WeatherAPI API error:', forecastData.error?.message);
        throw new Error('WeatherAPI API error');
      }
    } catch (error) {
      console.error('Error fetching forecast data from WeatherAPI:', error);
      setLoading(false); // Set loading to false on error
      return false; // Indicate failure
    }
    setLoading(false); // Set loading to false after fetching is done
    return true; // Indicate success
  };

  const updateWeatherData = (data, isWeatherAPI = false) => {
    if (isWeatherAPI) {
      setWeatherData({
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: `https:${data.current.condition.icon}`,
        wind: data.current.wind_kph,
        humidity: data.current.humidity,
        feelsLike: data.current.feelslike_c,
      });
      updateBackgroundVideo(data.current.condition.text);
    } else {
      setWeatherData({
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
      });
      updateBackgroundVideo(data.weather[0].main);
    }
  };

  const updateForecastData = (forecast) => {
    setForecastData(forecast);
  };

  const updateBackgroundVideo = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        setBackgroundVideo('/videos/clear-sky.mp4');
        break;
      case 'cloudy':
      case 'clouds':
        setBackgroundVideo('/videos/cloudy.mp4');
        break;
      case 'rain':
      case 'raining':
        setBackgroundVideo('/videos/raining.mp4');
        break;
      case 'wind':
      case 'windy':
        setBackgroundVideo('/videos/windy.mp4');
        break;
      case 'thunderstorm':
      case 'lightning':
        setBackgroundVideo('/videos/lightning.mp4');
        break;
      default:
        setBackgroundVideo('/videos/clear-sky.mp4'); // Fallback to clear sky video
    }
  };

  // Main function to fetch weather data with fallback logic
  const fetchWeatherData = async (city) => {
    let success = await fetchFromOpenWeatherMap(city);
    if (!success) {
      success = await fetchCurrentWeatherFromWeatherAPI(city);
    }

    // Always fetch forecast data from WeatherAPI
    await fetchForecastFromWeatherAPI(city);
  };

  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-4 bg-black/50 text-center">
        <Navbar />
        <h1 className="text-2xl md:text-4xl font-bold mb-2 mt-12 md:mt-24">Ultimate Weather Dashboard!</h1>
        <p className="text-xs md:text-sm mb-4 md:mb-8">Stay Ahead of the Weather with Real-Time Updates and Dynamic Visuals</p>
        <SearchBar onSearch={fetchWeatherData} />

        {/* Loader */}
        {loading && (
          <div className="mt-4 mb-4 text-center">
            <img src="/loader.gif" alt="Loading..." className="w-12 h-12 mx-auto" /> {/* GIF loader */}
          </div>
        )}

        {/* Weather Information Container */}
        {!loading && weatherData && (
          <div className="flex flex-col items-center justify-start mt-4 w-full transition-all duration-300" style={{ minHeight: '150px' }}>
            <WeatherInfo weatherData={weatherData} />
          </div>
        )}

        {/* Forecast Information Container */}
        {!loading && forecastData && (
          <div className="flex flex-col items-center justify-start mt-4 w-full transition-all duration-300" style={{ minHeight: '200px' }}>
            <ForecastInfo forecastData={forecastData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
