import { BUILD_TIMESTAMP, BUILD_COMMIT, BUILD_VERSION } from 'utils/build';
import { BUILD_UPDATED } from 'actions/types/build';

export const initialState = {
    timestamp: BUILD_TIMESTAMP,
    commit: BUILD_COMMIT,
    version: BUILD_VERSION
};

const build = (state = initialState, action) => {
    switch (action.type) {
        case BUILD_UPDATED:
            return {
                ...state,
                ...action.build
            };
        default:
            return state;
    }
};

export default build;