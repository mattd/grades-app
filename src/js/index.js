require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import start from './start';
import StoreFactory from './factories/store';
import history from './history';
import { isDev } from './utils/environment';
import consoleHelpers from './utils/console-helpers';
import devTools from './utils/dev-tools';
import App from './components/app';

const store = start(StoreFactory());

const render = (App) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
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