import Marker from "./Icons/Marker";
import styled from 'styled-components';
import Map from './Map';

// Weather Condition Icon.
import Fallback from './Icons/Fallback';
import Sunny from './Icons/Sunny';
import Cloudy from './Icons/Cloudy';

const iconComponents = {
    fallback: Fallback,
    sunny: Sunny,
    cloudy: Cloudy
};

const Wrapper = styled.div`
    min-height: 100px;
    padding: 0 2rem;

    .temp {
        display: flex;
        font-size: 2rem;
        filter: drop-shadow(-4.51px 2.26px 0.75px rgba(0, 0, 0, 0.15));

        span {
        font-size: 10rem;
        line-height: 0.8;
        }
    }

    .date {
        font-weight: 200;
        font-size: 2.7rem;
        filter: drop-shadow(-4.51px 2.26px 0.75px rgba(0, 0, 0, 0.15));
    }

    svg {
        height: 150px;
        width: 150px;
    }
`;

const Placeholder = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    grid-gap: 10px;

    svg {
        height: 150px;
        width: 150px;
    }
`;

const getTodaysDate = () => {
    const today = new Date();

    // Get user's timezone and set it in date Obj.
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    today.toLocaleString('en-US', { timeZone });
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

const Conditions = (props) => {
    const { responseObj, unit, coords } = props;
    let ConditionsIcon = iconComponents.fallback;
    let selectedUnit = '';
    if (undefined !== responseObj.weather) {
        selectedUnit = 'metric' === unit ? responseObj.weather.Temperature.Metric.Value : responseObj.weather.Temperature.Imperial.Value;

        // Set correct weather icon.
        const wObjKey = responseObj.weather.WeatherText.toLowerCase();
        ConditionsIcon = undefined !== iconComponents[wObjKey] ? iconComponents[wObjKey] : iconComponents.fallback;
        console.dir(responseObj.weather.WeatherText);
    }


    return (
        <div>
            {undefined !== responseObj.weather ?
                <>
                    <Wrapper>
                        <p>
                            <Marker />
                            <strong>{responseObj.address}</strong>
                        </p>
                        <p className="temp">
                            <span>{Math.round(selectedUnit)}</span>
                            {"metric" === unit ? `℃` : `℉`}
                        </p>
                        <p className="date">{getTodaysDate()}</p>
                        <p className="icon">
                            <ConditionsIcon />
                        </p>
                        <p>It is currently {Math.round(selectedUnit)} degrees out and it is {responseObj.weather.WeatherText}.</p>
                    </Wrapper>
                    <Map coords={coords} />
                </>
                :
                <Wrapper>
                    <Placeholder>
                        <p className="icon">
                            <ConditionsIcon />
                        </p>
                    </Placeholder>
                    <p className="date">{getTodaysDate()}</p>
                    <p>{responseObj.msg}</p>
                </Wrapper>
            }
        </div>
    )
}

export default Conditions;
