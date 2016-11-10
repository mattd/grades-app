import React from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux';

import store from './store';
import { setLoginDestination } from './action-creators/auth';
import App from './controllers/app';
import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';

// TODO: See if there's a logical way to put this on the Auth controller.
const requireAuthentication = (nextState) => {
    const state = store.getState().auth;
    const dispatch = store.dispatch.bind(store);

    if (!state.isAuthenticated) {
        dispatch(push('/authenticate'))
        dispatch(setLoginDestination(nextState.location.pathname));
    };
};

export default (
    <Route name="app" path="/" component={App}>
        <Route name="authenticate"
               path="authenticate"
               component={Authenticate} />
        <Route name="courses"
               path="courses"
               component={Courses}
               onEnter={requireAuthentication} />
    </Route>
);