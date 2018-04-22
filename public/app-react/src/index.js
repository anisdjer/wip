import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import Login from './containers/Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(

    <Router>
        <Route path="/login" exact component={Login} />
    </Router>,
   document.getElementById('root'));

//registerServiceWorker();
