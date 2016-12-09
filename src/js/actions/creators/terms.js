import uuid from 'uuid';
import Mousetrap from 'mousetrap';

import { TERMS_UPDATED, TERMS_FLUSH } from '../types/terms';
import { getTermsRef, getTermRef, getTermsPath } from '../../services/terms';
import { dbListenerAdded, dbListenerRemoved } from './db';
import { updateFormValues, updateFormDisplay, cleanForm } from './forms';
import { toggleAddingTerm } from './ui';
import { nextOrder } from '../../lib/firebase';

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
        return getTermRef(uid, values.id).set(values);
    };
};

export const updateTermValues = (values) => {
    return (dispatch) => {
        dispatch(updateFormValues('term', values));
    };
};

export const updateTermDisplay = (display) => {
    return (dispatch) => {
        dispatch(updateFormDisplay('term', display));
    };
};

export const startAddingTerm = () => {
    return (dispatch) => {
        dispatch(toggleAddingTerm());
        dispatch(updateTermValues({id: uuid()}));
        Mousetrap.bind('esc', () => {
            dispatch(stopAddingTerm());
        });
    };
};

export const stopAddingTerm = () => {
    return (dispatch) => {
        dispatch(toggleAddingTerm());
        dispatch(cleanForm('term'));
        Mousetrap.unbind('esc');
    };
};