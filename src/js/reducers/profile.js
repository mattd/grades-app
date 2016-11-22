import * as R from 'ramda';

import { PROFILE_UPDATED, PROFILE_FLUSH } from '../actions/types/profile';

const initialState = {};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_UPDATED:
            return {
                ...state,
                ...R.pick(
                    ['email', 'displayName', 'photoURL', 'uid'],
                    action.profile
                )
            };
        case PROFILE_FLUSH:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default profile;