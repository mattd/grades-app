require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { start } from './lib/firebase';
import StoreFactory from './factories/store';
import { isDev } from './utils/environment';
import consoleHelpers from './utils/console-helpers';
import devTools from './utils/dev-tools';
import Router from './components/router';
import { MuiThemeProvider } from './lib/material-ui';
import App from './components/app';

const store = start(StoreFactory());

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

if (isDev()) {
    devTools.bind(store);
    consoleHelpers.mountDev(store);
}
consoleHelpers.mountPublic();

render(App);

if (module.hot) {
    module.hot.accept('./components/app', () => {
        const NextApp = require('./components/app').default;
        render(NextApp);
    });
}