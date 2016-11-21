import * as R from 'ramda';

import { PROFILE_UPDATED } from '../actions/types/profile';

const profile = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_UPDATED:
            return {
                ...state,
                ...R.pick(
                    ['email', 'displayName', 'photoURL', 'uid'],
                    action.profile
                )
            };
        default:
            return state;
    }
};

export default profile;