import { PROFILE_UPDATED, PROFILE_FLUSH } from '../types/profile';

export const profileUpdated = (profile) => {
    return {
        type: PROFILE_UPDATED,
        profile
    };
};

export const flushProfile = () => {
    return {
        type: PROFILE_FLUSH
    };
};