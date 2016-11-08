require('../scss/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import firebase from './firebase';
import store from './store';
import Auth from './controllers/auth';
import routes from './routes';

firebase.start();

ReactDOM.render(
    <Provider store={store}>
        <Auth>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </Auth>
    </Provider>,
    document.getElementById('root')
);

window.store = store;