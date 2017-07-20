import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Authenticate from './authenticate';
import Profile from './profile';
import TermList from './terms/list';
import TermDetail from './terms/detail';
import CourseList from './courses/list';
import StudentList from './students/list';

const NoMatch = () => {
    return <h2>404</h2>;
};

export const UnauthenticatedRoutes = ({location}) => {
    return (
        <Switch>
            <Route
                path="/authenticate"
                exact
                component={Authenticate} />
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
                component={Authenticate} />
            <Route
                exact
                path="/profile"
                component={Profile} />
            <Route
                exact
                path="/terms"
                component={TermList} />
            <Route
                exact
                path="/terms/:id"
                component={TermDetail} />
            <Route
                exact
                path="/courses"
                component={CourseList} />
            <Route
                exact
                path="/students"
                component={StudentList} />
            <Redirect exact from="/" to="/terms" />
            <Route component={NoMatch} />
        </Switch>
    );
};