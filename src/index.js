import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Comments from './CommComponent';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/comments" component={Comments}/>
            <Route exact path="/" component={App}/>
        </Switch>

    </Router>
    , document.getElementById('root'));

