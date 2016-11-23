import {
    DB_LISTENER_ADDED,
    DB_LISTENER_REMOVED,
    DB_LISTENER_FLUSH
} from '../actions/types/db';

const initialState = {};

const getRefObject = (path, active) => {
    const ref = {};
    ref[path] = active;
    return ref;
};

const db = (state = initialState, action) => {
    switch (action.type) {
        case DB_LISTENER_ADDED:
            return {
                ...state,
                ...getRefObject(action.path, true)
            };
        case DB_LISTENER_REMOVED:
            return {
                ...state,
                ...getRefObject(action.path, false)
            };
        case DB_LISTENER_FLUSH:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default db;