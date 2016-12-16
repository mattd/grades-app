require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { start } from './lib/firebase';
import StoreFactory from './factories/store';
import { isDev } from './utils/environment';
import log from './utils/log';
import Router from './components/router';
import { MuiThemeProvider } from './lib/material-ui';
import Root from './components/root';

const store = start(StoreFactory());

const render = (Root) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <MuiThemeProvider>
                        <Root />
                    </MuiThemeProvider>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

if (isDev()) log.helpers.mountDev();
log.helpers.mountPublic();

render(Root);

if (module.hot) {
    module.hot.accept('./components/root', () => {
        const NextRoot = require('./components/root').default;
        render(NextRoot);
    });
}