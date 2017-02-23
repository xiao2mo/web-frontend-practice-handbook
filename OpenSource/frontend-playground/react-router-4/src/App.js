import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AnimationExample from './animated-transition/animated';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React Router 4</h2>
        </div>
        <p className="App-intro">
          {/*基本示例*/}
          {/*<BasicExample/>*/}
          {/*转场动画*/}
          <AnimationExample/>
        </p>
      </div>
    );
  }
}

export default App;
