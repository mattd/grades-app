const teacher = (
    state = {
        displayName: null,
        id: null,
        image: null,
        terms: [],
        timerDefault: null
    },
    action
) => {
    switch (action.type) {
        case 'TEACHER_UPDATED':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default teacher;