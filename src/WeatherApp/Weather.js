import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import { WiThermometer, WiHumidity, WiCloud } from "react-icons/wi";
import { GiModernCity } from "react-icons/gi";

const Weather = () => {
  const [city, setCity] = useState("delhi");
  const [temp, setTemp] = useState("0");
  const [humidity, setHumidity] = useState(0);
  const [weather, setWeather] = useState("cold");
  const [text, setText] = useState("", 0);

  const getData = async () => {
    try {
      const curr = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=2b125839ed8438143918a6a4fc824e89`
      );
      //  console.log(curr.data);
      let W = curr.data.weather[0].description;
      let C = curr.data.name;
      let H = curr.data.main.humidity;
      // console.log(W, C, H);
      setTemp(() => {
        return Math.floor(curr.data.main.temp - 273);
      });
      setHumidity(() => {
        return H;
      });
      setCity(() => {
        return C;
      });
      setWeather(() => {
        return W;
      });
      setText(() => {
        return "";
      });
    } catch {
      console.log("Error fetching Data");
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="d-flex flex-column justify-content-between ">
          <h3 className="mine">Enter Name of City</h3>
          <input
            type="text"
            className="form-control w-3"
            value={text}
            onChange={(e) => {
              setText(() => {
                return e.target.value;
              });
            }}
          />
          <div className="d-flex flex-row justify-content-center">
            <span className="h4">
              <GiModernCity></GiModernCity>
            </span>
            <span className="text-uppercase ml-5 h4">{city}</span>
          </div>
          <h1>
            Temprature <WiThermometer /> : {temp}°C
          </h1>
          <h1>
            Humidity <WiHumidity /> : {humidity}
          </h1>
          <h1>
            Weather <WiCloud></WiCloud> : {weather}
          </h1>
          <button
            onClick={() => {
              getData();
            }}
            className="btn btn-danger button"
          >
            Get Weather
          </button>
        </div>
      </div>
    </>
  );
};

export default Weather;
