import { BUILD_UPDATED } from 'actions/types/build';
import { getBuildRef, getBuildPath } from 'services/build';
import { dbListenerAdded } from 'actions/creators/db';

export const buildUpdated = (build) => {
    return {
        type: BUILD_UPDATED,
        build
    };
};

export const subscribeToBuild = () => {
    return (dispatch) => {
        getBuildRef().on('value', (snapshot) => {
            dispatch(buildUpdated(snapshot.val()))
        });
        dispatch(dbListenerAdded(getBuildPath()));
    };
};