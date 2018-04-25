import React, { Component } from 'react';
import Navbar from './containers/navbar/Navbar'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './containers/login/Login';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Navbar />
        <Router>
          <div>
              <Route path="/login" exact component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
