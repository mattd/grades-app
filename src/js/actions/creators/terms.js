import { TERMS_UPDATED, TERMS_FLUSH } from '../types/terms';
import { getTermsRef, getTermsPath } from '../../services/terms';
import { dbListenerAdded, dbListenerRemoved } from './db';

export const termsUpdated = (terms) => {
    return {
        type: TERMS_UPDATED,
        terms
    };
};

export const flushTerms = () => {
    return {
        type: TERMS_FLUSH
    };
};

export const subscribeToTerms = (uid) => {
    return (dispatch) => {
        getTermsRef(uid).on('value', (snapshot) => {
            dispatch(termsUpdated(snapshot.val()))
        });
        dispatch(dbListenerAdded(getTermsPath(uid)));
    };
};

export const unsubscribeFromTerms = (uid) => {
    return (dispatch) => {
        getTermsRef(uid).off('value');
        dispatch(dbListenerRemoved(getTermsPath(uid)));
    };
};