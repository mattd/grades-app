import { INFO_UPDATED, INFO_CLOSED, INFO_CLEAR } from 'actions/types/info';

export const updateInfo = (message) => {
    return {
        type: INFO_UPDATED,
        message
    };
};

export const closeInfo = () => {
    return {
        type: INFO_CLOSED
    };
};

export const clearInfo = () => {
    return {
        type: INFO_CLEAR
    };
};