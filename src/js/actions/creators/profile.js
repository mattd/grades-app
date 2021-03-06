import * as R from 'ramda';

import { PROFILE_UPDATED, PROFILE_FLUSH } from 'actions/types/profile';
import { getProfileRef, getProfilePath } from 'services/profile';
import { dbListenerAdded } from 'actions/creators/db';

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

export const subscribeToProfile = (uid) => {
    return (dispatch) => {
        getProfileRef(uid).on('value', (snapshot) => {
            dispatch(profileUpdated(snapshot.val()))
        });
        dispatch(dbListenerAdded(getProfilePath(uid)));
    };
};

export const setAndSubscribeToProfile = (user) => {
    return (dispatch, getState) => {
        const profile = {
            ...getState().profile.data,
            ...R.pick([
                'email',
                'displayName',
                'photoURL',
                'uid'
            ], user)
        };
        getProfileRef(profile.uid).set(profile);
        dispatch(subscribeToProfile(profile.uid));
    };
};