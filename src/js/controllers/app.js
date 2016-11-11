import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'firebase/auth';

import {
    authStatusUpdated,
    authStatusReady,
    authCommandSuccessful
} from '../action-creators/auth';
import { profileUpdated } from '../action-creators/profile';

import AuthLink from '../components/auth-link';
import Loading from '../components/loading';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().onAuthStateChanged(
            this.respondToAuthChange.bind(this)
        );
    }

    respondToAuthChange(user) {
        const dispatch = this.props.dispatch;

        dispatch(authStatusUpdated(user));
        if (user) {
            dispatch(profileUpdated(user));
        }
        dispatch(authStatusReady());
        this.navigateAfterAuthChange();
    }

    navigateAfterAuthChange() {
        const state = this.props.auth;
        const router = this.props.router;

        if (state.transitioned && state.isAuthenticated) {
            router.transitionTo(state.command.next || '/courses');
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

    renderApp() {
        return (
            <div>
                <h2>Grades App</h2>
                {this.props.children}
                <AuthLink />
            </div>
        );
    }

    renderLoading() {
        return <Loading />;
    }

    render() {
        const state = this.props.auth;

        if (state.ready) {
            return this.renderApp();
        } else {
            return this.renderLoading();
        }
    }
};

export default connect(mapStateToProps)(App);