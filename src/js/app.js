import React from 'react';
import firebase from 'firebase/app';
import _ from 'firebase/database';
import { connect } from 'react-redux';

import MainNav from './components/main-nav';
import { AuthLink } from './components/auth';

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

class App extends React.Component {
    handleTeacherDetailUpdates(snapshot) {
        console.log(snapshot.val());
    }

    openTeacherDetailUpdatesConnection(uid) {
        const ref = firebase.database().ref('/teachers/' + uid);
        ref.on('value', this.handleTeacherDetailUpdates);
    }

    guardTeacherDetailUpdatesConnection(nextProps) {
        const currentProfile = this.props.profile;
        const nextProfile = nextProps.profile;

        if (nextProfile.uid && (currentProfile.uid !== nextProfile.uid)) {
            this.openTeacherDetailUpdatesConnection(nextProfile.uid);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.guardTeacherDetailUpdatesConnection(nextProps);
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