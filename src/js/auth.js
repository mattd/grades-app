import { push } from 'react-router-redux';
import firebase from 'firebase';

import store from './store';

let provider;

const signIn = () => {
    firebase.auth().signInWithPopup(provider).then(result => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: true});
    }).catch(error => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: false});
    });
};

const signOut = () => {
    firebase.auth().signOut().then(() => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: true});
    }).catch(error => {
        store.dispatch({type: 'AUTH_COMMAND_COMPLETED', success: false});
    });
};

const handleAuthCommands = () => {
    const state = store.getState().auth;

    if (state.transitioned) return;

    if (state.command.type === 'sign-in') {
        signIn();
    } else if (state.command.type === 'sign-out') {
        signOut();
    }
};

const navigateAfterAuthChange = () => {
    const state = store.getState().auth;
    let destination;

    if (state.transitioned) {
        destination = (
            state.isAuthenticated ?
            state.command.next || '/courses' :
            '/authenticate'
        );
        store.dispatch(push(destination));
    }
};

const respondToAuthChange = (user) => {
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
    navigateAfterAuthChange();
};

const init = () => {
    require('firebase/auth');

    provider = new firebase.auth.GoogleAuthProvider();

    store.subscribe(handleAuthCommands);
    firebase.auth().onAuthStateChanged(respondToAuthChange);
};

const requireAuthentication = (nextState) => {
    const state = store.getState().auth;

    if (!state.isAuthenticated) {
        store.dispatch(push('/authenticate'))
        store.dispatch({
            type: 'AUTH_COMMAND_NEXT_PATH',
            next: nextState.location.pathname
        });
    };

};

export default { init, requireAuthentication };
