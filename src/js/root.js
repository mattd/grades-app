import React from 'react';
import { Provider } from 'react-redux';

import Router from './router';
import { MuiThemeProvider } from './lib/material-ui';
import App from './app';
import { isDev } from './utils/environment';
import { helpers } from './utils/console';

if (isDev()) helpers.mountDev();
helpers.mountPublic();

const Root = ({
    store
}) => {
    return (
        <Provider store={store}>
            <Router>
                <MuiThemeProvider>
                    <App />
                </MuiThemeProvider>
            </Router>
        </Provider>
    );
};

export default Root;