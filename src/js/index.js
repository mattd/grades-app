require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Match } from 'react-router';

import firebase from './firebase';
import StoreFactory from './store-factory';
import Router from './router';
import App from './controllers/app';
import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';
import { MatchWhenAuthenticated } from './routing';

firebase.start();

ReactDOM.render(
    <Provider store={StoreFactory()}>
        <Router>
            <App>
                <Match
                    pattern="/authenticate"
                    component={Authenticate} />
                <MatchWhenAuthenticated
                    pattern="/courses"
                    component={Courses} />
            </App>
        </Router>
    </Provider>,
    document.getElementById('root')
);