import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import Login from './containers/login/Login';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={App} />
        </div>
    </Router>,
   document.getElementById('root'));

//registerServiceWorker();
