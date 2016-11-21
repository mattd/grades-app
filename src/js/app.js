import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Match } from 'react-router';

import * as teacherActionCreators from './actions/creators/teacher';

import Authenticate from './controllers/authenticate';
import Courses from './controllers/courses';
import Students from './controllers/students';

import MainBar from './components/main-bar';
import MainDrawer from './components/main-drawer';
import { MatchWhenAuthenticated } from './components/router';

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators(teacherActionCreators, dispatch)
    };
};

class App extends React.Component {
    componentWillMount() {
        const { actionCreators, profile } = this.props;

        if (profile.uid) {
            actionCreators.subscribeToOrCreateTeacher(profile.uid);
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentProfile = this.props.profile;
        const nextProfile = nextProps.profile;
        const { actionCreators } = this.props;

        if (nextProfile.uid && (currentProfile.uid !== nextProfile.uid)) {
            actionCreators.subscribeToOrCreateTeacher(nextProfile.uid);
        }
    }

    render() {
        return (
            <div>
                <MainBar />
                <MainDrawer />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);