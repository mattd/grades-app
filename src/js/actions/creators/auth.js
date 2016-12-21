import firebase from 'firebase';

import { AUTH_STATUS_UPDATED, AUTH_STATUS_READY } from '../types/auth';

import { flushProfile } from '../creators/profile';
import { resetUi } from '../creators/ui';
import { removeDbListeners } from '../creators/db';
import { navigate } from '../creators/router';
import { setAndSubscribeToProfile } from '../creators/profile';
import { subscribeToTerms, flushTerms } from '../creators/terms';
import { subscribeToBuild } from '../creators/build';

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
            dispatch(
                navigate({
                    pathname: state.next || '/terms'
                })
            );
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