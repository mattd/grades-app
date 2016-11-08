import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import firebase from 'firebase';
import _ from 'firebase/auth';

import Loading from '../components/loading';

const mapStateToProps = function (state) {
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

        dispatch({
            type: 'AUTH_STATUS_UPDATED',
            authenticated: !!user
        });
        if (user) {
            dispatch({
                type: 'PROFILE_UPDATED',
                profile: user
            });
        }
        dispatch({type: 'AUTH_STATUS_READY', ready: true});
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

    signIn() {
        const dispatch = this.props.dispatch;

        firebase.auth().signInWithPopup(this.provider).then(result => {
            dispatch({type: 'AUTH_COMMAND_COMPLETED', success: true});
        }).catch(error => {
            dispatch({type: 'AUTH_COMMAND_COMPLETED', success: false});
        });
    }

    signOut() {
        const dispatch = this.props.dispatch;

        firebase.auth().signOut().then(() => {
            dispatch({type: 'AUTH_COMMAND_COMPLETED', success: true});
        }).catch(error => {
            dispatch({type: 'AUTH_COMMAND_COMPLETED', success: false});
        });
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