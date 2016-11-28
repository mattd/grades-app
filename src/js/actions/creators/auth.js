import firebase from 'firebase';

import { AUTH_STATUS_UPDATED, AUTH_STATUS_READY } from '../types/auth';

import { flushProfile } from '../creators/profile';
import { flushTeacher } from '../creators/teacher';
import { removeDbListeners } from '../creators/db';
import { navigate } from '../creators/router';
import { profileUpdated } from '../creators/profile';

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

export const flushData = () => {
    return (dispatch, getState) => {
        dispatch(flushProfile());
        dispatch(flushTeacher());
    };
};

export const signIn = () => {
    return (dispatch, getState) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(error => {
            // TODO: Do something in the UI with this error.
        });
    };
};

export const signOut = () => {
    return (dispatch, getState) => {
        firebase.auth().signOut().then(() => {
            dispatch(removeDbListeners());
            dispatch(flushData());
        }).catch(error => {
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
    return (dispatch, getState) => {
        dispatch(authStatusUpdated(user));
        if (user) {
            dispatch(profileUpdated(user));
        }
        dispatch(authStatusReady());
        dispatch(navigateAfterAuthChange());
    };
};