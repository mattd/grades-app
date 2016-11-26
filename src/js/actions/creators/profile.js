import { PROFILE_UPDATED, PROFILE_FLUSH } from '../types/profile';

import { subscribeToOrCreateTeacher } from './teacher';

export const flushProfile = () => {
    return {
        type: PROFILE_FLUSH
    };
};

export const profileUpdated = (profile) => {
    return (dispatch, getState) => {
        dispatch({
            type: PROFILE_UPDATED,
            profile
        });
        dispatch(subscribeToOrCreateTeacher(profile.uid));
    };
};