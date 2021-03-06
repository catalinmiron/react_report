import React from 'react';
import ReactDOM from 'react-dom';
import App from './Modules/App';
import './index.css';
import { Router, Route, hashHistory } from 'react-router'
import SuitePaneRoute from './Modules/SuitePaneRoute/index'
import NoSuite from './Modules/NoSuitePane/index'
import NewSuite from './Modules/NewSuitePane/index'

const NoMatch = () => <p>:(</p>;

ReactDOM.render((
    <Router history={hashHistory} >
        <Route path="/" component={App} >
            <Route path="/suite/:selectedSuite/build/:selectedBuild" component={SuitePaneRoute}/>
            <Route path="/noSuite" component={NoSuite}/>
            <Route path="/newSuite" component={NewSuite}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
),document.getElementById('root'));