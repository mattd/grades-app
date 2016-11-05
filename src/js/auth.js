import { push } from 'react-router-redux';
import firebase from 'firebase';

import store from './store';

let provider;

const signIn = () => {
    firebase.auth().signInWithPopup(provider).then(result => {
        console.log('Result:', result);
    }).catch(error => {
        console.log('Error:', error);
    });
};

const init = () => {
    require('firebase/auth');

    provider = new firebase.auth.GoogleAuthProvider();

    // TODO: Setup a listener that uses signIn - needs reducer work.
    // store.subscribe();

    firebase.auth().onAuthStateChanged(user => {
        store.dispatch({
            type: 'AUTH_STATUS_UPDATED',
            authenticated: !!user
        });
        if (user) {
            store.dispatch({
                type: 'PROFILE_UPDATED',
                profile: user
            });
            // TODO: Pull out the last requested route.
            store.dispatch(push('/courses'));
        }
    });
};

const requireAuth = () => {
    // TODO: Pull this from localStorage instead.
    // TODO: Add a listener to update localStorage auth status.
    const authenticated = store.getState().auth.isAuthenticated;
    if (!authenticated) store.dispatch(push('/authenticate'));
};

export default { init, requireAuth };
