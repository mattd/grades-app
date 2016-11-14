require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Match } from 'react-router';

import firebase from './firebase';
import StoreFactory from './store-factory';
import App from './controllers/app';
import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';
import { MatchWhenAuthenticated } from './components/routing';

firebase.start();

ReactDOM.render(
    <Provider store={StoreFactory()}>
        <BrowserRouter>
            {({ router }) => (
                <App router={router}>
                    <Match
                        pattern="/authenticate"
                        component={Authenticate} />
                    <MatchWhenAuthenticated
                        pattern="/courses"
                        component={Courses} />
                </App>
            )}
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);