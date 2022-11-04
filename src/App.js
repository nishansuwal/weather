import React, { useEffect, useState } from "react";
import { URL, key } from "./URL";
import "./scss/loading.css";
import "./scss/style.css";

const App = () => {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);

  const [search, setSearch] = useState("");

  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data !== null) {
      fetch(`${URL}?key=${key}&q=${data.city}&aqi=no`)
        .then((res) => res.json())
        .then((data) => setWeather(data));
    }
  }, [data]);

  const changeTemp = () => {
    setIsCelsius(!isCelsius);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setWeather(null);
    setSearch("");
    fetch(`${URL}?key=${key}&q=${search}&aqi=no`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  };

  if (weather === null) {
    return (
      <>
        <div className="outside-square"></div>
        <div className="inside-square"></div>
      </>
    );
  } else {
    return (
      <div className="wrapper">
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            type="text"
            className="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {weather.error !== undefined ? (
          <div>Location Not Found.</div>
        ) : (
          <>
            <h4>Weather Forecasting</h4>
            <p>{weather.location.localtime}</p>
            {/* <img src={weather.current.condition.icon} alt="icon" /> */}
            <div className="temp">
              <p onClick={() => changeTemp()}>
                {isCelsius
                  ? `${weather.current.temp_c}° C`
                  : `${weather.current.temp_f} F`}
              </p>
            </div>
            <p>{weather.location.name}</p>
            <p>{weather.location.city}</p>
            {/* <p>
              feels like{" "}
              {isCelsius
                ? `${weather.current.feelslike_c}° C`
                : `${weather.current.feelslike_f} F`}
            </p> */}
          </>
        )}
      </div>
    );
  }
};

export default App;
