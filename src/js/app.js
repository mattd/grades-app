import React from 'react';
import { connect } from 'react-redux';

import { subscribeToOrCreateTeacher } from './thunks/teacher';

import MainNav from './components/main-nav';
import { AuthLink } from './components/auth';

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

class App extends React.Component {
    componentWillMount() {
        const { dispatch, profile } = this.props;

        if (profile.uid) {
            dispatch(subscribeToOrCreateTeacher(profile.uid));
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentProfile = this.props.profile;
        const nextProfile = nextProps.profile;
        const { dispatch } = this.props;

        if (nextProfile.uid && (currentProfile.uid !== nextProfile.uid)) {
            dispatch(subscribeToOrCreateTeacher(nextProfile.uid));
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

export default connect(mapStateToProps)(App);