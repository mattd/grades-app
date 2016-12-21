import { BUILD_TIMESTAMP, BUILD_COMMIT, BUILD_VERSION } from './build';

const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
};

const consoleHelpers = {
    mountDev: (store) => {
        window.store = store;
        window.pretty = pretty;
    },
    mountPublic: () => {
        window.BUILD_TIMESTAMP = BUILD_TIMESTAMP;
        window.BUILD_COMMIT = BUILD_COMMIT;
        window.BUILD_VERSION = BUILD_VERSION;
    }
};

export default consoleHelpers;