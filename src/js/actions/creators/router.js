import { NAVIGATE } from '../types/router';

export const navigate = (location, action = 'PUSH') => {
    return {
        type: NAVIGATE,
        location,
        action
    };
};