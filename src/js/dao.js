import React from 'react';
import firebase from 'firebase/app';
import _ from 'firebase/database';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

class DAO extends React.Component {
    conditionallySetTeacherListener(nextProps) {
        const currentProfile = this.props.profile;
        const nextProfile = nextProps.profile;
        let ref;

        if (nextProfile.uid && (currentProfile.uid !== nextProfile.uid)) {
            ref = firebase.database().ref('/teachers/' + nextProfile.uid);
            ref.on('value', snapshot => console.log(snapshot.val()));
        }
    }

    componentWillReceiveProps(nextProps) {
        this.conditionallySetTeacherListener(nextProps);
    }

    render() {
        return this.props.children;
    }
}

export default connect(mapStateToProps)(DAO);