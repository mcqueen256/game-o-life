import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './App.css';
import Grid from './components/grid.js';
import Controls from './components/controls.js';
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Controls />
        <Grid />
      </div>
    </Provider>
  );
}

export default App;
