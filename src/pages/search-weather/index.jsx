import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../env.contanst";
import { AreaGraph } from "../../components/area-graph";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { WeatherReport } from "../../components/weather-report";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./index.css";

export default function SearchWeather() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(false);
  const [, setWeatherHistory] = useLocalStorage("weatherHistory", []);
  const navigate = useNavigate();

  const goToHistoryPage = useCallback(() => navigate("/history"), []);

  const handleChange = useCallback((e) => setCityName(e.target.value), []);

  const getCityWeatherData = useCallback(async () => {
    try {
      const response = await fetch(API_URL + cityName);
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setWeatherHistory((prev) => [...prev, data]);
        setCityName("");
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }, [cityName]);

  return (
    <div id="search-weather">
      <div className="search-weather__heading">
        <h6>Weather</h6>
      </div>
      <div className="search-weather__city">
        <Input
          value={cityName}
          placeholder="City ..."
          type="text"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={getCityWeatherData}>
          Search
        </Button>
        <Button variant="outlined" onClick={goToHistoryPage}>
          History
        </Button>
      </div>
      {Object.keys(weatherData)?.length && !error ? (
        <WeatherReport weatherData={weatherData} />
      ) : error ? (
        <div className="search-weather__null-state">
          {`Oops, Something went wrong!! Please try again.. :(`}
        </div>
      ) : (
        <div className="search-weather__null-state">
          Please search for a city, use above input box and click search...
        </div>
      )}
 {weatherData?.name && <AreaGraph city={weatherData?.name} /> }
    </div>
  );
}
