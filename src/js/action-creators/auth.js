export const userIsAuthenticated = (answer) => {
    return {
        type: 'AUTH_STATUS_UPDATED',
        authenticated: answer
    };
};

export const profileUpdated = (profile) => {
    return {
        type: 'PROFILE_UPDATED',
        profile
    };
};

export const authStatusReady = () => {
    return {
        type: 'AUTH_STATUS_READY',
        ready: true
    };
};

export const authCommandSuccessful = (answer) => {
    return {
        type: 'AUTH_COMMAND_COMPLETED',
        success: answer
    };
};

export const setLoginDestination = (destination) => {
    return {
        type: 'AUTH_COMMAND_NEXT_PATH',
        next: destination
    };
};