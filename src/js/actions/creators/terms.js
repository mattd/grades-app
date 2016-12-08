import uuid from 'uuid';
import Mousetrap from 'mousetrap';

import { TERMS_UPDATED, TERMS_FLUSH } from '../types/terms';
import { getTermsRef, getTermsPath } from '../../services/terms';
import { dbListenerAdded, dbListenerRemoved } from './db';
import { updateForm, cleanForm } from './forms';
import { toggleAddingTerm } from './ui';

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

export const updateTerm = (term) => {
    return (dispatch) => {
        dispatch(updateForm('term', term));
    };
};

export const startAddingTerm = () => {
    return (dispatch) => {
        dispatch(toggleAddingTerm());
        dispatch(updateTerm({id: uuid()}));
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