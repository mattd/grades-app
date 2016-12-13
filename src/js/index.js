require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { isDev } from './utils/environment';
import { helpers } from './utils/console';
import { start } from './lib/firebase';
import StoreFactory from './store-factory';
import Router from './router';
import { MuiThemeProvider } from './lib/material-ui';
import App from './app';

if (isDev()) helpers.mountDev();
helpers.mountPublic();

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
