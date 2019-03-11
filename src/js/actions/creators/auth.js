import firebase from 'firebase';
import { push } from 'connected-react-router';

import { AUTH_STATUS_UPDATED, AUTH_STATUS_READY } from 'actions/types/auth';

import { flushProfile } from 'actions/creators/profile';
import { resetUi } from 'actions/creators/ui';
import { removeDbListeners } from 'actions/creators/db';
import { setAndSubscribeToProfile } from 'actions/creators/profile';
import { subscribeToTerms, flushTerms } from 'actions/creators/terms';
import { subscribeToBuild } from 'actions/creators/build';

export const authStatusUpdated = (user) => {
    return {
        type: AUTH_STATUS_UPDATED,
        authenticated: !!user
    };
};

export const authStatusReady = () => {
    return {
        type: AUTH_STATUS_READY,
        ready: true
    };
};

export const signIn = () => {
    return () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(() => {
            // TODO: Do something in the UI with this error.
        });
    };
};

export const flushUserData = () => {
    return (dispatch) => {
        dispatch(flushProfile());
        dispatch(flushTerms());
    };
};

export const subscribeToGradesData = (uid) => {
    return (dispatch) => {
        dispatch(subscribeToTerms(uid));
    };
};

export const signOut = () => {
    return (dispatch) => {
        firebase.auth().signOut().then(() => {
            dispatch(removeDbListeners());
            dispatch(flushUserData());
            dispatch(resetUi());
        }).catch(() => {
            // TODO: Do something in the UI with this error.
        });
    };
};

export const navigateAfterAuthChange = () => {
    return (dispatch, getState) => {
        const { isAuthenticated } = getState().auth;
        const { state } = getState().router.location;

        if (isAuthenticated && state) {
            dispatch(push(state.next || '/terms'));
        }
    };
};

export const respondToAuthChange = (user) => {
    return (dispatch) => {
        dispatch(authStatusUpdated(user));
        if (user) {
            dispatch(setAndSubscribeToProfile(user));
            dispatch(subscribeToGradesData(user.uid));
        }
        dispatch(subscribeToBuild());
        dispatch(authStatusReady());
        dispatch(navigateAfterAuthChange());
    };
};