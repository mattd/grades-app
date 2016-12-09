require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { isDev, attachHelpers } from './utils/dev';
import { start } from './lib/firebase';
import StoreFactory from './store-factory';
import Router from './router';
import { MuiThemeProvider } from './lib/material-ui';
import App from './app';

if (isDev()) attachHelpers();

ReactDOM.render(
    <Provider store={start(StoreFactory())}>
        <Router>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);