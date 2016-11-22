import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import {
    authStatusUpdated,
    authStatusReady,
    authCommandSuccessful
} from './actions/creators/auth';
import { profileUpdated } from './actions/creators/profile';
import { navigate } from './actions/creators/router';

import Loading from './components/loading';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            authStatusUpdated,
            authStatusReady,
            authCommandSuccessful,
            profileUpdated,
            navigate
        }, dispatch)
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
        const { actionCreators } = this.props;

        actionCreators.authStatusUpdated(user);
        if (user) {
            actionCreators.profileUpdated(user);
        }
        actionCreators.authStatusReady();
        this.navigateAfterAuthChange();
    }

    navigateAfterAuthChange() {
        const { auth, actionCreators } = this.props;

        if (auth.transitioned && auth.isAuthenticated) {
            actionCreators.navigate({
                pathname: auth.command.next || '/courses'
            })
        }
    }

    handleAuthCommandResult(promise) {
        const { actionCreators } = this.props;

        promise.then(() => {
            actionCreators.authCommandSuccessful(true);
        }).catch(error => {
            actionCreators.authCommandSuccessful(false);
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);