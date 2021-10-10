import Marker from "../Icons/Marker";
import styled from 'styled-components';
import Sun from '../Icons/Sun';
import Cloud from '../Icons/Cloud';
import Temp from '../Icons/Temp';

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
    const { responseObj } = props;

    if (404 === parseInt(responseObj.cod)) {
        responseObj.msg = 'City not found.';
    }
    return (
        <div>
            {responseObj.cod === 200 ?
                <Wrapper>
                    <p>
                        <Marker />
                        <strong>{responseObj.name}</strong>
                    </p>
                    <p>It is currently {Math.round(responseObj.main.temp)} degrees out with {responseObj.weather[0].description}.</p>
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
