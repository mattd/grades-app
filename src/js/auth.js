import * as R from 'ramda';
import { goBack, push } from 'react-router-redux';
import firebase from 'firebase';

import store from './store';

let provider;

const signIn = () => {
    firebase.auth().signInWithPopup(provider).then(result => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: true});
        store.dispatch(goBack());
    }).catch(error => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: false});
    });
};

const signOut = () => {
    firebase.auth().signOut().then(() => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: true});
        store.dispatch(push('/authenticate'));
    }).catch(error => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: false});
    });
};

const handleAuthCommands = () => {
    const state = store.getState().auth;

    if (!R.isNil(state.command.success)) return;

    if (state.command.type === 'sign-in') {
        signIn();
    } else if (state.command.type === 'sign-out') {
        signOut();
    }
};

const updateAuthState = (user) => {
    store.dispatch({
        type: 'AUTH_STATUS_UPDATED',
        authenticated: !!user
    });
    if (user) {
        store.dispatch({
            type: 'PROFILE_UPDATED',
            profile: user
        });
    }
    store.dispatch({type: 'AUTH_STATUS_READY', ready: true});
};

const init = () => {
    require('firebase/auth');

    provider = new firebase.auth.GoogleAuthProvider();

    store.subscribe(handleAuthCommands);
    firebase.auth().onAuthStateChanged(updateAuthState);
};

const requireAuthentication = () => {
    const authenticated = store.getState().auth.isAuthenticated;
    if (!authenticated) store.dispatch(push('/authenticate'));
};

export default { init, requireAuthentication };
