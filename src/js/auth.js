import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

import {
    authStatusUpdated,
    authStatusReady,
    authCommandSuccessful
} from './action-creators/auth';
import { profileUpdated } from './action-creators/profile';
import { navigate } from './action-creators/router';

import Loading from './components/loading';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

class Auth extends React.Component {
    constructor(props) {
        super(props);
        window.dispatch = this.props.dispatch;
        this.provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().onAuthStateChanged(
            this.respondToAuthChange.bind(this)
        );
    }

    respondToAuthChange(user) {
        const { dispatch } = this.props;

        dispatch(authStatusUpdated(user));
        if (user) {
            dispatch(profileUpdated(user));
        }
        dispatch(authStatusReady());
        this.navigateAfterAuthChange();
    }

    navigateAfterAuthChange() {
        const { auth, dispatch } = this.props;

        if (auth.transitioned && auth.isAuthenticated) {
            dispatch(
                navigate({
                    pathname: auth.command.next || '/courses'
                })
            );
        }
    }

    handleAuthCommandResult(promise) {
        const { dispatch } = this.props;

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
        const { auth } = this.props;

        if (!auth.transitioned) {
            if (auth.command.type === 'sign-in') {
                this.signIn();
            } else if (auth.command.type === 'sign-out') {
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
        const { auth } = this.props;

        if (auth.ready) {
            return this.renderChildren();
        } else {
            return this.renderLoading();
        }
    }
};

export default connect(mapStateToProps)(Auth);