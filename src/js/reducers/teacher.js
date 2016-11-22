import { TEACHER_UPDATED, TEACHER_FLUSH } from '../actions/types/teacher';

const initialState = {
    displayName: null,
    uid: null,
    photoURL: null,
    email: null,
    terms: null,
    timerDefault: 900
};

const teacher = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TEACHER_UPDATED:
            return {
                ...state,
                ...action.payload
            };
        case TEACHER_FLUSH:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default teacher;