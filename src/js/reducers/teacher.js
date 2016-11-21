import { TEACHER_UPDATED } from '../actions/types/teacher';

const teacher = (
    state = {
        displayName: null,
        uid: null,
        photoURL: null,
        email: null,
        terms: null,
        timerDefault: 900
    },
    action
) => {
    switch (action.type) {
        case TEACHER_UPDATED:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default teacher;