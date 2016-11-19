import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as authSyncActionCreators from './action-creators/sync/auth';
import * as profileSyncActionCreators from './action-creators/sync/profile';
import * as routerSyncActionCreators from './action-creators/sync/router';

import Loading from './components/loading';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            sync: bindActionCreators({
                ...authSyncActionCreators,
                ...profileSyncActionCreators,
                ...routerSyncActionCreators
            }, dispatch)
        }
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
        const { actions } = this.props;

        actions.sync.authStatusUpdated(user);
        if (user) {
            actions.sync.profileUpdated(user);
        }
        actions.sync.authStatusReady();
        this.navigateAfterAuthChange();
    }

    navigateAfterAuthChange() {
        const { auth, actions } = this.props;

        if (auth.transitioned && auth.isAuthenticated) {
            actions.sync.navigate({
                pathname: auth.command.next || '/courses'
            })
        }
    }

    handleAuthCommandResult(promise) {
        const { actions } = this.props;

        promise.then(() => {
            actions.sync.authCommandSuccessful(true);
        }).catch(error => {
            actions.sync.authCommandSuccessful(false);
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