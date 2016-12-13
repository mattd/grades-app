import { BUILD_UPDATED } from '../types/build';
import { getBuildRef, getBuildPath } from '../../services/build';
import { dbListenerAdded } from './db';

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