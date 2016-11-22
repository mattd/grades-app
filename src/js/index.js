require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import firebase from './lib/firebase';
import { MuiThemeProvider } from './lib/material-ui';
import StoreFactory from './store-factory';
import Router from './router';
import Auth from './auth';
import App from './app';

firebase.start();

const store = StoreFactory();
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Auth>
                <MuiThemeProvider>
                    <App />
                </MuiThemeProvider>
            </Auth>
        </Router>
    </Provider>,
    document.getElementById('root')
);