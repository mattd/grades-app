import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import firebase from 'firebase';
import _ from 'firebase/auth';

import {
    userIsAuthenticated,
    profileUpdated,
    authStatusReady,
    authCommandSuccessful
} from '../action-creators/auth';

import Loading from '../components/loading';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().onAuthStateChanged(
            this.respondToAuthChange.bind(this)
        );
    }

    respondToAuthChange(user) {
        const dispatch = this.props.dispatch;

        dispatch(userIsAuthenticated(!!user));
        if (user) {
            dispatch(profileUpdated(user));
        }
        dispatch(authStatusReady());
        this.navigateAfterAuthChange();
    }

    navigateAfterAuthChange() {
        const state = this.props.auth;
        const dispatch = this.props.dispatch;
        let destination;

        if (state.transitioned) {
            destination = (
                state.isAuthenticated ?
                state.command.next || '/courses' :
                '/authenticate'
            );
            dispatch(push(destination));
        }
    }

    handleAuthCommandResult(promise) {
        const dispatch = this.props.dispatch;

        promise.then(() => {
            dispatch(authCommandSuccessful(true));
        }).catch(error => {
            dispatch(authCommandSuccessful(false));
        });
    }

    signIn() {
        this.handleAuthCommandResult(
            firebase.auth().signInWithPopup(this.provider)
        );
    }

    signOut() {
        this.handleAuthCommandResult(
            firebase.auth().signOut()
        );
    }

    componentDidUpdate() {
        const state = this.props.auth;

        if (!state.transitioned) {
            if (state.command.type === 'sign-in') {
                this.signIn();
            } else if (state.command.type === 'sign-out') {
                this.signOut();
            }
        }
    }

    renderChildren() {
        return this.props.children;
    }

    renderLoading() {
        return <Loading />;
    }

    render() {
        const state = this.props.auth;

        if (state.ready) {
            return this.renderChildren();
        } else {
            return this.renderLoading();
        }
    }
};

export default connect(mapStateToProps)(Auth);