const teacherUpdated = (payload) => {
    return {
        type: 'TEACHER_UPDATED',
        payload
    };
};

export { teacherUpdated };