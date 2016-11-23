import { DB_LISTENER_ADDED, DB_LISTENER_REMOVED } from '../types/db';

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