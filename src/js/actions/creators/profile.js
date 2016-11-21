import { PROFILE_UPDATED } from '../types/profile';

export const profileUpdated = (profile) => {
    return {
        type: PROFILE_UPDATED,
        profile
    };
};