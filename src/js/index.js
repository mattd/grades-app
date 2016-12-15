require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'

import { start } from './lib/firebase';
import StoreFactory from './store-factory';
import { isDev } from './utils/environment';
import { helpers } from './utils/console';
import Router from './router';
import { MuiThemeProvider } from './lib/material-ui';
import App from './app';

const store = start(StoreFactory());

if (isDev()) helpers.mountDev();
helpers.mountPublic();

const render = (App) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <MuiThemeProvider>
                        <App />
                    </MuiThemeProvider>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./app', () => {
        const NextApp = require('./app').default;
        render(NextApp);
    });
}