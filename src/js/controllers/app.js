import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as teacherActionCreators from '../action-creators/teacher';

import MainNav from '../components/main-nav';
import { AuthLink } from '../components/auth';

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
                <MainNav />
                <div className="content">
                    <h2>Grades App</h2>
                    {this.props.children}
                    <AuthLink />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);