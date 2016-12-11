const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
};

export const helpers = {
    mountDev: () => {
        window.pretty = pretty;
    },
    mountPublic: () => {
        window.BUILD_DATE = process.env['BUILD_DATE'];
        window.BUILD_COMMIT = process.env['BUILD_COMMIT'];
    }
};