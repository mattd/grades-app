require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Match } from 'react-router';

import firebase from './firebase';
import StoreFactory from './store-factory';
import Router from './router';
import App from './app';
import DAO from './dao';
import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';
import Students from './controllers/students';
import { MatchWhenAuthenticated } from './components/router';

firebase.start();
window.store = StoreFactory();
ReactDOM.render(
    <Provider store={window.store}>
        <Router>
            <DAO>
                <App>
                    <Match
                        pattern="/authenticate"
                        component={Authenticate} />
                    <MatchWhenAuthenticated
                        pattern="/courses"
                        component={Courses} />
                    <MatchWhenAuthenticated
                        pattern="/students"
                        component={Students} />

                </App>
            </DAO>
        </Router>
    </Provider>,
    document.getElementById('root')
);