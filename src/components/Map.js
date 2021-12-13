import { Loader } from "@googlemaps/js-api-loader"
import styled from 'styled-components';

const Wrapper = styled.div`
    min-height: 400px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`;

const Map = (props) => {
    console.log(props.coords.lat);
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        version: "weekly"
    });

    const mapOptions = {
        center: {
            lat: parseFloat(props.coords.lat),
            lng: parseFloat(props.coords.lng)
        },
        zoom: 7
    };

    // Promise
    loader
        .load()
        .then((google) => {
            const map = new google.maps.Map(document.getElementById("map"), mapOptions);
            const marker = new google.maps.Marker({
                position: { lat: props.coords.lat, lng: props.coords.lng },
                map: map,
            });
        })
        .catch(e => {
            // do something
        });

    return (
        <Wrapper id="map"></Wrapper>
    );
}

export default Map;