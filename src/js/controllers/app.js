import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'firebase/auth';
import { Link } from 'react-router';

import {
    authStatusUpdated,
    authStatusReady,
    authCommandSuccessful
} from '../action-creators/auth';
import { profileUpdated } from '../action-creators/profile';
import { navigate } from '../action-creators/router';

import { AuthLink } from '../components/auth';
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

    renderApp() {
        // TODO: Make nav a separate component.
        return (
            <div>
                <Link to="/" activeClassName="active">
                    Home
                </Link>
                //
                <Link to="/courses" activeClassName="active">
                    Courses
                </Link>
                //
                <Link to="/students" activeClassName="active">
                    Students
                </Link>
                //
                <Link to="/authenticate" activeClassName="active">
                    Authenticate
                </Link>

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
        const { auth } = this.props;

        if (auth.ready) {
            return this.renderApp();
        } else {
            return this.renderLoading();
        }
    }
};

export default connect(mapStateToProps)(App);