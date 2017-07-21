import { PROFILE_UPDATED, PROFILE_FLUSH } from 'actions/types/profile';

export const initialState = {
    displayName: null,
    uid: null,
    photoURL: null,
    email: null,
    timerDefault: 900
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_UPDATED:
            return {
                ...state,
                ...action.profile
            };
        case PROFILE_FLUSH:
            return initialState;
        default:
            return state;
    }
};

export default profile;