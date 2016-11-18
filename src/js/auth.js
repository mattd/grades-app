import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'firebase/auth';

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

    renderApp() {
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