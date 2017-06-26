import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AuthenticateController from './controllers/authenticate';
import ProfileController from './controllers/profile';
import TermListController from './controllers/term-list';
import TermDetailController from './controllers/term-detail';
import CourseListController from './controllers/course-list';
import StudentListController from './controllers/student-list';

const NoMatch = () => {
    return <h2>404</h2>;
};

export const UnauthenticatedRoutes = ({location}) => {
    return (
        <Switch>
            <Route
                path="/authenticate"
                exact
                component={AuthenticateController} />
            <Redirect to={{
                pathname: "/authenticate",
                state: {next: location.pathname}
            }} />
        </Switch>
    );
};

export const AuthenticatedRoutes = () => {
    return (
        <Switch>
            <Route
                exact
                path="/authenticate"
                component={AuthenticateController} />
            <Route
                exact
                path="/profile"
                component={ProfileController} />
            <Route
                exact
                path="/terms"
                component={TermListController} />
            <Route
                exact
                path="/terms/:id"
                component={TermDetailController} />
            <Route
                exact
                path="/courses"
                component={CourseListController} />
            <Route
                exact
                path="/students"
                component={StudentListController} />
            <Redirect exact from="/" to="/terms" />
            <Route component={NoMatch} />
        </Switch>
    );
};