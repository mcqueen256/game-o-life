import React, { useEffect } from 'react';
import './App.css';
import Grid from './components/grid.js';
import Controls from './components/controls.js';
import { connect } from 'react-redux';
import { tick } from "./redux/actions";

const App = (props) => {
  const { tick } = props;

  useEffect(()=> {
      console.group("useEffect")
      console.log("Setting interval");
      const interval = setInterval(()=>{
          tick();
      }, 1000);
      console.log({interval});
      console.groupEnd();
  }, []);

  return (
      <div className="App">
        <Controls />
        <Grid />
      </div>
  );
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => ({
  tick: () => dispatch(tick()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
