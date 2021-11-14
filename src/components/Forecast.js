import { useState } from "react"
import Conditions from "./Conditions";
import { Geocoding } from "./APIs/Google";
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
    let [coords, setCoords] = useState('');

    // Format city to be URL-friendly.
    const uriEncodedCity = encodeURIComponent(city);

    async function getForecast(e) {
        e.preventDefault();
        console.log('clicked');
        // If city/address/zipcode field is empty...
        if ('' === city) {
            setResponseObj({ msg: 'Field is empty.' });
            return;
        }

        const geocodeObj = await Geocoding(uriEncodedCity, responseObj, setResponseObj);

        // If coordinates not found.
        if (!geocodeObj.geometry.location) {
            setResponseObj({ msg: 'Could not find coordinations for location.' });
            return;
        }

        setCoords(geocodeObj.geometry.location);
        const coordsStr = `${geocodeObj.geometry.location.lat},${geocodeObj.geometry.location.lng}`;

        try {
            let data = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${coordsStr}`, {
                "method": "GET"
            });

            const locationObj = await data.json();

            data = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationObj.Key}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}`, {
                "method": "GET"
            });
            const weather = await data.json();
            setResponseObj({ address: geocodeObj.formatted_address, weather: weather[0] });

        } catch (e) {
            setResponseObj({ msg: `${e.message}. Try again later.` });
        }
    }

    return (
        <Wrapper>
            <h2>Find Current Weather Conditions</h2>
            <div>
                <Conditions responseObj={responseObj} unit={unit} coords={coords} />
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
                    Celsius
                </label>
                <Button type="submit">Get Forecast</Button>
            </form>
        </Wrapper>
    )
}

export default Forecast;
