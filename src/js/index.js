require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import firebase from './firebase';
import auth from './auth';
import store from './store';
import routes from './routes';

firebase.start();
auth.init();

const mount = (callback) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </Provider>,
        document.getElementById('root')
    );
    callback();
};

const unsubscribe = store.subscribe(() => {
    const ready = store.getState().auth.ready;
    if (ready) mount(unsubscribe);
});
