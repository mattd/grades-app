import React from 'react';
import { Match, Redirect, Miss } from 'react-router';

import AuthenticateController from './controllers/authenticate';
import ProfileController from './controllers/profile';
import TermListController from './controllers/term-list';
import TermDetailController from './controllers/term-detail';
import CourseListController from './controllers/course-list';
import StudentListController from './controllers/student-list';

const styles = () => {
    return {
        container: {
            display: 'inline'
        }
    };
};

const NoMatch = () => {
    return <h2>404</h2>;
};

export const UnauthenticatedMatches = () => {
    return (
        <div style={styles().container}>
            <Match
                exactly
                pattern="/"
                render={() => <Redirect to="/authenticate" />} />
            <Match pattern="/:all" render={() => (
                <div style={styles().container}>
                    <Match
                        pattern="/authenticate"
                        exactly
                        component={AuthenticateController} />
                    <Miss render={({location}) => (
                        <Redirect to={{
                            pathname: "/authenticate",
                            state: {next: location.pathname}
                        }} />
                    )} />
                </div>
            )} />
        </div>
    );
};

export const AuthenticatedMatches = () => {
    return (
        <div style={styles().container}>
            <Match
                exactly
                pattern="/"
                render={() => <Redirect to="/terms" />} />
            <Match pattern="/:all" render={() => (
                <div style={styles().container}>
                    <Match
                        exactly
                        pattern="/authenticate"
                        render={AuthenticateController} />
                    <Match
                        exactly
                        pattern="/profile"
                        component={ProfileController} />
                    <Match
                        exactly
                        pattern="/terms"
                        component={TermListController} />
                    <Match
                        pattern="/terms/:id"
                        component={TermDetailController} />
                    <Match
                        exactly
                        pattern="/courses"
                        component={CourseListController} />
                    <Match
                        exactly
                        pattern="/students"
                        component={StudentListController} />
                    <Miss component={NoMatch} />
                </div>
            )} />
        </div>
    );
};