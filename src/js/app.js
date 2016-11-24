import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Match } from 'react-router';

import { subscribeToOrCreateTeacher } from './actions/creators/teacher';

import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';
import Students from './controllers/students';

import AppBar from './components/app-bar';
import Drawer from './components/drawer';
import { MatchWhenAuthenticated } from './components/router';

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            subscribeToOrCreateTeacher
        }, dispatch)
    };
};

const App = ({
    profile,
    actionCreators
}) => {
    if (profile.uid) {
        actionCreators.subscribeToOrCreateTeacher(profile.uid);
    }
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);