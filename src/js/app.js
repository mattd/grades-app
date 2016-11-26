import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';

import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';
import Students from './controllers/students';

import Loading from './components/loading';
import AppBar from './components/app-bar';
import Drawer from './components/drawer';
import { MatchWhenAuthenticated } from './components/router';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const App = ({
    auth
}) => {
    if (!auth.ready) {
        return <Loading />;
    } else {
        return (
            <div>
                <AppBar />
                <Drawer />
                <Match
                    pattern="/authenticate"
                    component={Authenticate} />
                <MatchWhenAuthenticated
                    pattern="/courses"
                    component={Courses} />
                <MatchWhenAuthenticated
                    pattern="/students"
                    component={Students} />
            </div>
        );
    }
};

export default connect(mapStateToProps)(App);