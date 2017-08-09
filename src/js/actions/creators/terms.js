import Mousetrap from 'mousetrap';

import { TERMS_UPDATED, TERMS_FLUSH } from 'actions/types/terms';
import { getTermsRef, getTermRef, getTermsPath } from 'services/terms';
import { dbListenerAdded, dbListenerRemoved } from 'actions/creators/db';
import { setAddingTerm } from 'actions/creators/ui';
import { nextOrder } from 'utils/ordering';

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

export const setTerm = (values) => {
    return (dispatch, getState) => {
        const { uid } = getState().profile;
        values.order = nextOrder(getState().terms);
        getTermRef(uid, values.id).set(values);
    };
};

export const removeTerm = (uid, termId, callback) => {
    return () => {
        getTermRef(uid, termId).remove(callback)
    };
};

export const startAddingTerm = () => {
    return (dispatch) => {
        dispatch(setAddingTerm(true));
        Mousetrap.bind('esc', () => {
            dispatch(stopAddingTerm());
        });
    };
};

export const stopAddingTerm = () => {
    return (dispatch) => {
        dispatch(setAddingTerm(false));
        Mousetrap.unbind('esc');
    };
};