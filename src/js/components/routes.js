import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AuthenticateFeature from './features/authenticate';
import ProfileFeature from './features/profile';
import TermListFeature from './features/terms/list';
import TermDetailFeature from './features/terms/detail';
import CourseListFeature from './features/courses/list';
import StudentListFeature from './features/students/list';

const NoMatch = () => {
    return <h2>404</h2>;
};

export const UnauthenticatedRoutes = ({location}) => {
    return (
        <Switch>
            <Route
                path="/authenticate"
                exact
                component={AuthenticateFeature} />
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
                component={AuthenticateFeature} />
            <Route
                exact
                path="/profile"
                component={ProfileFeature} />
            <Route
                exact
                path="/terms"
                component={TermListFeature} />
            <Route
                exact
                path="/terms/:id"
                component={TermDetailFeature} />
            <Route
                exact
                path="/courses"
                component={CourseListFeature} />
            <Route
                exact
                path="/students"
                component={StudentListFeature} />
            <Redirect exact from="/" to="/terms" />
            <Route component={NoMatch} />
        </Switch>
    );
};