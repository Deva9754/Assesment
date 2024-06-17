import "./index.css";
import Cloud from "../../assets/icons/clouds.png";
import Rainy from "../../assets/icons/rainy.png";
import Haze from "../../assets/icons/haze.png";
import Sunny from "../../assets/icons/sun.png";

const icons = {
  Clouds: Cloud,
  Haze: Haze,
  rainy: Rainy,
  sunny: Sunny,
  Smoke: Cloud,
};

export const WeatherReport = (props) => {
  const { weatherData = {} } = props;

  return (
    <div id="weather-report">
      <div className="weather-report__Heading">
        <h4>{weatherData?.name}</h4>
      </div>
      <div className="weather-report__details">
        <div className="weather-report__details-temprature">
          <img
            src={icons[weatherData?.weather[0]?.main]}
            alt="Weather icon"
            height={75}
            width={75}
          />
          <div className="weather-report__details-temprature-value">
            <h6>{weatherData?.main?.temp} °C</h6>
            <div className="caption">{`(${weatherData?.weather[0]?.main})`}</div>
          </div>
        </div>
        <div className="weather-report__details-summary">
          <div className="weather__summary">
            <div className="key">Max Temp:</div>
            <div className="value">{weatherData?.main?.temp_max}</div>
          </div>
          <div className="weather__summary">
            <div className="key">Min Temp:</div>
            <div className="value">{weatherData?.main?.temp_min}</div>
          </div>
          <div className="weather__summary">
            <div className="key">Humidity:</div>
            <div className="value">{weatherData?.main?.humidity}</div>
          </div>
          <div className="weather__summary">
            <div className="key">Wind Speed:</div>
            <div className="value">{weatherData?.wind?.speed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
