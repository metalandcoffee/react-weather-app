import { useState } from "react"
import Conditions from "./Conditions/Conditions";
import styled from 'styled-components';

const Wrapper = styled.div`
    border-radius: 25px;
    padding: 2rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(255, 255, 255, 0.2);
`;

const City = styled.input`
    display: block;
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid white;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1rem;

    &::placeholder {
        font-family: 'Poppins', sans-serif;
        color: #c9c9c9;
    }

    &:focus-visible {
        outline: none;
    }
`;

const Button = styled.button`
    font-family: 'Poppins', sans-serif;
    display: block;
    background-color: #D5D5D5;
    color: #5c3959;
    border-radius: 17px;
    border: none;
    width: 100%;
    font-size: 1rem;
    padding: 1rem 0.5rem;
    line-height: 1;
    transition: all 0.3s;
    margin-top: 1rem;

    &:hover {
        background-color: #b7b6b6;
        color: white;
        font-weight: bold;
    }
`;


const Forecast = () => {

    // Define needed variables for tracking.
    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');

    // Format city to be URL-friendly.
    const uriEncodedCity = encodeURIComponent(city);

    async function getForecast(e) {
        e.preventDefault();

        // If city field is empty...
        if ('' === city) {
            setResponseObj({ msg: 'City field is empty.' });
            return;
        }
        try {
            const data = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&lat=0&lon=0&id=2172797&lang=null&units=${unit}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_WEATHER_API_KEY
                }
            });
            const weather = await data.json();
            console.log(weather);
            setResponseObj(weather);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Wrapper>
            <h2>Find Current Weather Conditions</h2>
            <div>
                <Conditions responseObj={responseObj} />
            </div>
            <form onSubmit={getForecast}>
                <City
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Fahrenheit
                </label>
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Celcius
                </label>
                <Button type="submit">Get Forecast</Button>
            </form>
        </Wrapper>
    )
}

export default Forecast;
