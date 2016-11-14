export const navigate = (pathname, state, action = 'PUSH') => {
    return {
        type: 'NAVIGATE',
        location: {
            pathname,
            state
        },
        action
    };
};