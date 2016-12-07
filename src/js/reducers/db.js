import {
    DB_LISTENER_ADDED,
    DB_LISTENER_REMOVED,
    DB_LISTENERS_FLUSH
} from '../actions/types/db';

import { makeObject } from '../utils/reducer';

const initialState = {};

const db = (state = initialState, action) => {
    switch (action.type) {
        case DB_LISTENER_ADDED:
            return {
                ...state,
                ...makeObject(action.path, true)
            };
        case DB_LISTENER_REMOVED:
            return {
                ...state,
                ...makeObject(action.path, false)
            };
        case DB_LISTENERS_FLUSH:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default db;