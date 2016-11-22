import {
    AUTH_COMMAND,
    AUTH_COMMAND_COMPLETED,
    AUTH_COMMAND_NEXT_PATH,
    AUTH_STATUS_UPDATED,
    AUTH_STATUS_READY
} from '../types/auth';

import { flushProfile } from '../creators/profile';
import { flushTeacher } from '../creators/teacher';

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

export const authCommandSuccessful = (answer) => {
    return {
        type: AUTH_COMMAND_COMPLETED,
        success: answer
    };
};

export const setLoginDestination = (destination) => {
    return {
        type: AUTH_COMMAND_NEXT_PATH,
        next: destination
    };
};

export const signIn = () => {
    return {
        type: AUTH_COMMAND,
        command: 'sign-in'
    };
};

export const signOut = () => {
    return {
        type: AUTH_COMMAND,
        command: 'sign-out'
    };
};

export const flushData = () => {
    return (dispatch, getState) => {
        dispatch(flushProfile());
        dispatch(flushTeacher());
    };
};