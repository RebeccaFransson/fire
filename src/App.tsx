import React, { useState } from 'react';
import logo from './logo.svg';
import { AppWrapper, ClickableTitle } from './style';
import FireCalculator from './components/fire-calculator';

function App() {
  const [ fireCalucatorOpen, setFireCalucatorOpen ] = useState(false);

  return (
    <AppWrapper>
      <div>
        Rebecca Fransson
      </div>
      <div onClick={() => setFireCalucatorOpen(!fireCalucatorOpen)}>
        <ClickableTitle>Fire calculator</ClickableTitle>
        { fireCalucatorOpen ? <FireCalculator /> : null }
      </div>
      <div>
        <ClickableTitle>Theme</ClickableTitle>
      </div>
      <div>
        <h2>Footer</h2>
      </div>
    </AppWrapper>
  );
}

export default App;