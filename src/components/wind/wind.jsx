import AirIcon from "@mui/icons-material/Air";
import "./wind.css";
const Wind = (props) => {
  const { weatherData = {} } = props;

  return (
    <div className="wind-box">
      <div className="wind-detail">
        <AirIcon />
        Wind Speed:
      </div>
      <div className="value">{weatherData?.wind?.speed}</div>
    </div>
  );
};
export default Wind;
