require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import { start } from './lib/firebase';
import StoreFactory from './store-factory';
import Root from './root';

const store = start(StoreFactory());

ReactDOM.render(
    <AppContainer>
        <Root store={store} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./root', () => {
        const NextRoot = require('./root').default;
        ReactDOM.render(
            <AppContainer>
                <NextRoot store={store} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}