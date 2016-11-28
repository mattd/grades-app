require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { start } from './lib/firebase';
import { MuiThemeProvider } from './lib/material-ui';
import StoreFactory from './store-factory';
import Router from './router';
import App from './app';

const store = StoreFactory();
window.store = store;

ReactDOM.render(
    <Provider store={start(store)}>
        <Router>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);