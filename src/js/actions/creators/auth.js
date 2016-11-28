import firebase from 'firebase';

import {
    AUTH_STATUS_UPDATED,
    AUTH_STATUS_READY,
    AUTH_SET_NEXT_PATH
} from '../types/auth';

import { flushProfile } from '../creators/profile';
import { flushTeacher } from '../creators/teacher';
import { removeDbListeners } from '../creators/db';
import { profileUpdated } from '../creators/profile';
import { navigate } from '../creators/router';

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

// TODO: Actually use this somewhere.
export const setLoginDestination = (destination) => {
    return {
        type: AUTH_SET_NEXT_PATH,
        next: destination
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
            dispatch(toggleAuthTransition());
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
        const { state, pathname } = getState().router.location;

        if (isAuthenticated && state && state.next !== pathname ) {
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