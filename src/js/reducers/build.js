import { BUILD_TIMESTAMP, BUILD_COMMIT, BUILD_VERSION } from 'utils/build';
import { BUILD_UPDATED } from 'actions/types/build';

export const initialState = {
    meta: {updated: false},
    data: {
        timestamp: BUILD_TIMESTAMP,
        commit: BUILD_COMMIT,
        version: BUILD_VERSION
    }
};

const build = (state = initialState, action) => {
    switch (action.type) {
        case BUILD_UPDATED:
            return {
                meta: {updated: true},
                data: {
                    ...state.data,
                    ...action.build
                }
            };
        default:
            return state;
    }
};

export default build;