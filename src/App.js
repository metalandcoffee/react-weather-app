import './App.css';
import Forecast from './components/Forecast';
import styled from 'styled-components';

const Wrapper = styled.main`
  display: grid;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title>Metal's Weather App</Title>
      </header>
      <Wrapper>
        <Forecast />
      </Wrapper>
      <footer>

      </footer>
    </div>
  );
}

export default App;
