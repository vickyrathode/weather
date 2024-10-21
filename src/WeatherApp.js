// import React, { useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { FaTemperatureHigh } from 'react-icons/fa';
// import { WiHumidity, WiStrongWind } from 'react-icons/wi';
// import 'chart.js/auto'; // Import chart.js to use in React

// const WeatherApp = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState({
//     temp: 0,
//     humidity: 0,
//     wind: 0,
//     forecast: [],
//     hourlyTemps: []
//   });
//   const [error, setError] = useState('');

//   const apiKey = '50516ea309594aef936161904242110'; // Your API key

//   const getWeatherData = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&hour=24`
//       );
//       const weather = response.data;

//       // Extract hourly temperatures for the graph
//       const hourlyTemps = weather.forecast.forecastday[0].hour.map(hour => ({
//         time: hour.time.split(' ')[1], // Get time part (e.g. 14:00)
//         temp: hour.temp_c
//       }));

//       setWeatherData({
//         temp: weather.current.temp_c,
//         humidity: weather.current.humidity,
//         wind: weather.current.wind_kph,
//         forecast: weather.forecast.forecastday,
//         hourlyTemps
//       });

//       setError('');
//     } catch (error) {
//       if (error.response) {
//         setError(`Error: ${error.response.data.error.message}`);
//       } else if (error.request) {
//         setError('Error: No response from server. Please try again later.');
//       } else {
//         setError(`Error: ${error.message}`);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (city) {
//       getWeatherData();
//     } else {
//       setError('Please enter a city name.');
//     }
//   };

//   const hourlyChartData = {
//     labels: weatherData.hourlyTemps.map((data) => data.time),
//     datasets: [
//       {
//         label: 'Temperature (°C)',
//         data: weatherData.hourlyTemps.map((data) => data.temp),
//         borderColor: '#ffa726',
//         backgroundColor: 'rgba(255, 167, 38, 0.2)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     <div className="weather-app" style={{ color: '#fff', background: '#1c1c1e', padding: '20px', borderRadius: '10px' }}>
//       <form onSubmit={handleSubmit} className="search-bar" style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name"
//           className="search-input"
//           style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
//         />
//         <button type="submit" className="search-button" style={{ padding: '10px', marginLeft: '10px' }}>Search</button>
//       </form>

//       {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

//       <div className="weather-info">
//         <h2 className="city-name" style={{ marginBottom: '10px' }}>{city ? city : "Enter a city"}</h2>
//         <div className="weather-stats" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
//           <div className="stat-item">
//             <FaTemperatureHigh className="weather-icon" style={{ fontSize: '30px', marginBottom: '5px' }} />
//             <p>{weatherData.temp}°C</p>
//           </div>
//           <div className="stat-item">
//             <WiHumidity className="weather-icon" style={{ fontSize: '30px', marginBottom: '5px' }} />
//             <p>{weatherData.humidity}%</p>
//           </div>
//           <div className="stat-item">
//             <WiStrongWind className="weather-icon" style={{ fontSize: '30px', marginBottom: '5px' }} />
//             <p>{weatherData.wind} kph</p>
//           </div>
//         </div>

//         {/* Hourly temperature chart */}
//         <h3 style={{ marginBottom: '10px' }}>Hourly Temperature</h3>
//         <div style={{ background: '#2c2c2e', padding: '20px', borderRadius: '10px' }}>
//           <Line data={hourlyChartData} />
//         </div>

//         {/* 7-Day Forecast */}
//         <h3 style={{ marginTop: '20px' }}>7-Day Forecast:</h3>
//         <div className="forecast" style={{ display: 'flex', justifyContent: 'space-between' }}>
//           {weatherData.forecast.map((day, index) => (
//             <div className="forecast-day" key={index} style={{ textAlign: 'center', padding: '10px', background: '#2c2c2e', borderRadius: '10px', width: '120px' }}>
//               <p>{day.date}</p>
//               <p>{day.day.avgtemp_c}°C</p>
//               <img src={day.day.condition.icon} alt="weather icon" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherApp;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { FaTemperatureHigh } from 'react-icons/fa';
// import { WiHumidity, WiStrongWind } from 'react-icons/wi';
// import 'chart.js/auto'; // Import chart.js automatically

// const WeatherApp = () => {
//   const [city, setCity] = useState('Bengaluru'); // Default city is Bengaluru
//   const [weatherData, setWeatherData] = useState({
//     temp: 0,
//     humidity: 0,
//     wind: 0,
//     forecast: [],
//     hourlyTemps: [],
//     conditionIcon: '',
//   });
//   const [error, setError] = useState('');

//   const apiKey = '50516ea309594aef936161904242110'; // Replace with your actual API key

//   // Fetch data when the component mounts
//   useEffect(() => {
//     getWeatherData();
//   }, []);

//   const getWeatherData = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&hour=24`
//       );
//       const weather = response.data;

//       // Extract hourly temperatures and precipitation for the graph
//       const hourlyTemps = weather.forecast.forecastday[0].hour.map(hour => ({
//         time: hour.time.split(' ')[1], // Get time part (e.g. 14:00)
//         temp: hour.temp_c,
//         precipitation: hour.precip_mm,
//         wind: hour.wind_kph,
//       }));

//       setWeatherData({
//         temp: weather.current.temp_c,
//         humidity: weather.current.humidity,
//         wind: weather.current.wind_kph,
//         forecast: weather.forecast.forecastday,
//         hourlyTemps,
//         conditionIcon: weather.current.condition.icon, // Current weather condition icon
//       });

//       setError('');
//     } catch (error) {
//       if (error.response) {
//         setError(`Error: ${error.response.data.error.message}`);
//       } else if (error.request) {
//         setError('Error: No response from server. Please try again later.');
//       } else {
//         setError(`Error: ${error.message}`);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (city) {
//       getWeatherData();
//     } else {
//       setError('Please enter a city name.');
//     }
//   };

//   const hourlyChartData = {
//     labels: weatherData.hourlyTemps.map((data) => data.time),
//     datasets: [
//       {
//         label: 'Temperature (°C)',
//         data: weatherData.hourlyTemps.map((data) => data.temp),
//         borderColor: '#ffa726',
//         backgroundColor: 'rgba(255, 167, 38, 0.2)',
//         fill: true,
//         tension: 0.4,
//       },
//       {
//         label: 'Wind Speed (kph)',
//         data: weatherData.hourlyTemps.map((data) => data.wind),
//         borderColor: '#29b6f6',
//         backgroundColor: 'rgba(41, 182, 246, 0.2)',
//         fill: true,
//         tension: 0.4,
//       },
//       {
//         label: 'Precipitation (mm)',
//         data: weatherData.hourlyTemps.map((data) => data.precipitation),
//         borderColor: '#7e57c2',
//         backgroundColor: 'rgba(126, 87, 194, 0.2)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     <div className="weather-app" style={{ color: '#fff', background: '#1c1c1e', padding: '20px', borderRadius: '10px' }}>
//       <form onSubmit={handleSubmit} className="search-bar" style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name"
//           className="search-input"
//           style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
//         />
//         <button type="submit" className="search-button" style={{ padding: '10px', marginLeft: '10px' }}>Search</button>
//       </form>

//       {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

//       <div className="weather-info">
//         <h2 className="city-name" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//           {city ? city : "Enter a city"}
//           {weatherData.conditionIcon && (
//             <img src={weatherData.conditionIcon} alt="Weather icon" style={{ marginLeft: '10px', width: '40px' }} />
//           )}
//         </h2>
//         <div className="weather-stats" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
//           <div className="stat-item">
//             <FaTemperatureHigh className="weather-icon" style={{ fontSize: '30px', marginBottom: '5px' }} />
//             <p>{weatherData.temp}°C</p>
//           </div>
//           <div className="stat-item">
//             <WiHumidity className="weather-icon" style={{ fontSize: '30px', marginBottom: '5px' }} />
//             <p>{weatherData.humidity}%</p>
//           </div>
//           <div className="stat-item">
//             <WiStrongWind className="weather-icon" style={{ fontSize: '30px', marginBottom: '5px' }} />
//             <p>{weatherData.wind} kph</p>
//           </div>
//         </div>

//         {/* Hourly temperature, wind, and precipitation chart */}
//         <h3 style={{ marginBottom: '10px' }}>Hourly Temperature, Wind, and Precipitation</h3>
//         <div style={{ background: '#2c2c2e', padding: '20px', borderRadius: '10px' }}>
//           <Line data={hourlyChartData} />
//         </div>

//         {/* 7-Day Forecast */}
//         <h3 style={{ marginTop: '20px' }}>7-Day Forecast:</h3>
//         <div className="forecast" style={{ display: 'flex', justifyContent: 'space-between' }}>
//           {weatherData.forecast.map((day, index) => (
//             <div className="forecast-day" key={index} style={{ textAlign: 'center', padding: '10px', background: '#2c2c2e', borderRadius: '10px', width: '120px' }}>
//               <p>{day.date}</p>
//               <p>{day.day.avgtemp_c}°C</p>
//               <img src={day.day.condition.icon} alt="Weather icon" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherApp;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherApp = () => {
  const [city, setCity] = useState('Bengaluru'); // Default city is Bengaluru
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    humidity: 0,
    wind: 0,
    forecast: [],
    conditionIcon: '',
    description: '',
    localTime: '',
  });
  const [error, setError] = useState('');

  const apiKey = '50516ea309594aef936161904242110'; // Replace with your actual API key

  // Fetch data when the component mounts
  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`
      );
      const weather = response.data;

      // Extract current weather and forecast information
      setWeatherData({
        temp: weather.current.temp_c,
        humidity: weather.current.humidity,
        wind: weather.current.wind_kph,
        forecast: weather.forecast.forecastday,
        conditionIcon: weather.current.condition.icon, // Current weather condition icon
        description: weather.current.condition.text, // Current weather description
        localTime: weather.location.localtime, // Local time
      });

      setError('');
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.error.message}`);
      } else if (error.request) {
        setError('Error: No response from server. Please try again later.');
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      getWeatherData();
    } else {
      setError('Please enter a city name.');
    }
  };

  // Function to get the day name from the date
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="weather-app" style={{ color: '#fff', background: '#1c1c1e', padding: '20px', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit} className="search-bar" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
          style={{ padding: '10px', fontSize: '26px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" className="search-button" style={{ padding: '10px', marginLeft: '10px',fontSize: '25px' }}>Search</button>
      </form>

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      <div className="weather-info">
        <h2 className="city-name" style={{ marginBottom: '10px',fontSize:"50px" }}>
          {city ? city : "Enter a city"}
          {weatherData.conditionIcon && (
            <img src={weatherData.conditionIcon} alt="Weather icon" style={{ marginLeft: '10px', width: '70px' }} />
          )}
        </h2>

        {/* Display current weather details */}
        <p style={{ marginBottom: '10px', fontSize:"20px" }}>
          {getDayName(weatherData.localTime)} {new Date(weatherData.localTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} <br />
          {weatherData.description}
        </p>

        <div className="weather-stats" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '5px' }}>
          <div className="stat-item">
            <FaTemperatureHigh className="weather-icon" style={{ fontSize: '45px', marginBottom: '5px' }} />Temperature
            <p  style={{ fontSize: '25px'}}>{weatherData.temp}°C</p>
          </div>
          <div className="stat-item">
            <WiHumidity className="weather-icon" style={{ fontSize: '50px', marginBottom: '5px' }} />Precipitation
            <p  style={{ fontSize: '25px'}}>{weatherData.humidity}%</p>
          </div>
          <div className="stat-item">
            <WiStrongWind className="weather-icon" style={{ fontSize: '50px', marginBottom: '5px' }} />Wind speed
            <p  style={{ fontSize: '25px'}}>{weatherData.wind} kph</p>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <h3 style={{ marginTop: '20px' }}>7-Day Forecast:</h3>
        <div className="forecast" style={{ display: 'flex', justifyContent: 'space-between',gap:'3px' }}>
          {weatherData.forecast.map((day, index) => (
            <div className="forecast-day" key={index} style={{ textAlign: 'center', padding: '10px', background: '#2c2c2e', borderRadius: '10px', width: '120px' }}>
              <p>{getDayName(day.date)}</p>
              <p>{day.day.avgtemp_c}°C</p>
              <img src={day.day.condition.icon} alt="Weather icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
