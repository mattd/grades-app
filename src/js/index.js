require('../scss/style.scss');

//require('./firebase');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import store from './store';
import { requireAuth } from './auth';

import App from './controllers/app';
import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route name="app"
                   path="/"
                   component={App}>
                <Route name="authenticate"
                       path="authenticate"
                       component={Authenticate} />
                <Route name="courses"
                       path="courses"
                       component={Courses}
                       onEnter={requireAuth} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);