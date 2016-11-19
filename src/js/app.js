import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as teacherAsyncActionCreators from './action-creators/async/teacher';

import MainNav from './components/main-nav';
import { AuthLink } from './components/auth';

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            async: bindActionCreators(teacherAsyncActionCreators, dispatch)
        }
    };
};

class App extends React.Component {
    componentWillMount() {
        const { actions, profile } = this.props;

        if (profile.uid) {
            actions.async.subscribeToOrCreateTeacher(profile.uid);
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentProfile = this.props.profile;
        const nextProfile = nextProps.profile;
        const { actions } = this.props;

        if (nextProfile.uid && (currentProfile.uid !== nextProfile.uid)) {
            actions.async.subscribeToOrCreateTeacher(nextProfile.uid);
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