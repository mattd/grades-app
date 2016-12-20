import React from 'react';
import { Match, Redirect, Miss } from 'react-router';

import AuthenticateController from '../controllers/authenticate';
import ProfileController from '../controllers/profile';
import TermListController from '../controllers/term-list';
import TermDetailController from '../controllers/term-detail';
import CourseListController from '../controllers/course-list';
import StudentListController from '../controllers/student-list';

import MatchWhenAuthenticated from './match-when-authenticated';
import NoMatch from './no-match';

const styles = () => {
    return {
        container: {
            display: 'inline'
        }
    };
};

const AuthenticatedMatches = () => {
    return (
        <div style={styles().container}>
            <MatchWhenAuthenticated
                exactly
                pattern="/profile"
                component={ProfileController} />
            <MatchWhenAuthenticated
                exactly
                pattern="/terms"
                component={TermListController} />
            <MatchWhenAuthenticated
                pattern="/terms/:id"
                component={TermDetailController} />
            <MatchWhenAuthenticated
                exactly
                pattern="/courses"
                component={CourseListController} />
            <MatchWhenAuthenticated
                exactly
                pattern="/students"
                component={StudentListController} />
            <Miss component={NoMatch} />
        </div>
    );
};

const Matches = () => {
    return (
        <div style={styles().container}>
            <Match
                pattern="/"
                exactly
                render={() => <Redirect to="/terms" />} />
            <Match
                pattern="/authenticate"
                exactly
                component={AuthenticateController} />
            <Match
                pattern="/:rest"
                component={AuthenticatedMatches} />
        </div>
    );
};

export default Matches;