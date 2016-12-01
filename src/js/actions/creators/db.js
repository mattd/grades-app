import firebase from 'firebase';

import {
    DB_LISTENER_ADDED,
    DB_LISTENER_REMOVED,
    DB_LISTENER_FLUSH
} from '../types/db';

export const dbListenerAdded = (path) => {
    return {
        type: DB_LISTENER_ADDED,
        path
    };
};

export const dbListenerRemoved = (path) => {
    return {
        type: DB_LISTENER_REMOVED,
        path
    };
};

export const dbListenerFlush = () => {
    return {
        type: DB_LISTENER_FLUSH
    };
}

export const removeDbListener = (path) => {
    return (dispatch) => {
        firebase.database().ref(path).off();
        dispatch(dbListenerRemoved(path));
    };
};

export const removeDbListeners = () => {
    return (dispatch, getState) => {
        const listeners = getState().db;
        Object.keys(listeners).forEach(path => {
            dispatch(removeDbListener(path));
        });
        dispatch(dbListenerFlush())
    };
};