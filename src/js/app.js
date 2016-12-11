import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';

import { Page } from './components/containers';
import Authenticate from './controllers/authenticate';
import Profile from './controllers/profile';
import Terms from './controllers/terms';
import Courses from './controllers/courses';
import Students from './controllers/students';

import Loading from './components/loading';
import AppBar from './components/app-bar';
import Drawer from './components/drawer';
import { MatchWhenAuthenticated } from './components/router';

const mapStateToProps = (state) => {
    return {
        ready: state.auth.ready
    };
};

const App = ({
    ready
}) => {
    if (!ready) {
        return <Loading />;
    } else {
        return (
            <div>
                <AppBar />
                <Drawer />
                <Page>
                    <Match
                        pattern="/"
                        exactly
                        render={() => <Redirect to="/terms" />} />
                    <Match
                        pattern="/authenticate"
                        component={Authenticate} />
                    <MatchWhenAuthenticated
                        pattern="/profile"
                        component={Profile} />
                    <MatchWhenAuthenticated
                        pattern="/terms"
                        component={Terms} />
                    <MatchWhenAuthenticated
                        pattern="/courses"
                        component={Courses} />
                    <MatchWhenAuthenticated
                        pattern="/students"
                        component={Students} />
                </Page>
            </div>
        );
    }
};

export default connect(mapStateToProps)(App);