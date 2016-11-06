import React from 'react';
import { Route } from 'react-router';

import auth from './auth';
import App from './controllers/app';
import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';

export default (
    <Route name="app" path="/" component={App}>
        <Route name="authenticate"
               path="authenticate"
               component={Authenticate} />
        <Route name="courses"
               path="courses"
               component={Courses}
               onEnter={auth.requireAuthentication} />
    </Route>
);