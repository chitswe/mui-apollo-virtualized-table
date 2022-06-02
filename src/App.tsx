import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AutoSizer, AutoSizerProps } from 'react-virtualized';

const AutoSizerFixed = AutoSizer as unknown as React.ElementType<AutoSizerProps>;
function App() {
  return (<AutoSizerFixed defaultHeight={500}>
    {(size) => {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }}
  </AutoSizerFixed>);

}

export default App;
