import firebase from 'firebase';

import {
    AUTH_STATUS_UPDATED,
    AUTH_STATUS_READY,
    AUTH_TOGGLE_TRANSITION,
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

export const toggleAuthTransition = () => {
    return {
        type: AUTH_TOGGLE_TRANSITION
    };
};

// TODO: Actually use this somewhere to
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

        dispatch(toggleAuthTransition());

        firebase.auth().signInWithPopup(provider).catch(error => {
            // TODO: Do something with this error.
        });
    };
};

export const signOut = () => {
    return (dispatch, getState) => {
        firebase.auth().signOut().then(() => {
            dispatch(removeDbListeners());
            dispatch(flushData());
        }).catch(error => {
            // TODO: Do something with this error.
        });
    };
};


export const navigateAfterAuthChange = () => {
    return (dispatch, getState) => {
        const { auth } = getState();
        if (auth.isAuthenticated && auth.transitioning) {
            dispatch(
                navigate({
                    pathname: auth.next || '/courses'
                })
            );
            dispatch(toggleAuthTransition());
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