const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
};

export const attachHelpers = () => {
    window.pretty = pretty;
};

export const isDev = () => {
    return process.env['NODE_ENV'] !== 'production';
};