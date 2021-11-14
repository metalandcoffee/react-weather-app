import Marker from "./Icons/Marker";
import styled from 'styled-components';
import Sun from './Icons/Sun';
import Cloud from './Icons/Cloud';
import Temp from './Icons/Temp';
import Map from './Map';

const Wrapper = styled.div`
    min-height: 100px;
`;

const Placeholder = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    grid-gap: 10px;

    svg {
        height: 55px;
        width: 55px;
    }
`;

const Conditions = (props) => {
    const { responseObj, unit, coords } = props;
    let selectedUnit = '';
    if (undefined !== responseObj.weather) {
        selectedUnit = 'metric' === unit ? responseObj.weather.Temperature.Metric.Value : responseObj.weather.Temperature.Imperial.Value;
    }

    return (
        <div>
            {undefined !== responseObj.weather ?
                <Wrapper>
                    <p>
                        <Marker />
                        <strong>{responseObj.address}</strong>
                    </p>
                    <p>It is currently {Math.round(selectedUnit)} degrees out and it is {responseObj.weather.WeatherText}.</p>
                    <Map coords={coords} />
                </Wrapper>
                :
                <Wrapper>
                    <Placeholder>
                        <Sun />
                        <Cloud />
                        <Temp />
                    </Placeholder>
                    <p>{responseObj.msg}</p>
                </Wrapper>
            }
        </div>
    )
}

export default Conditions;
