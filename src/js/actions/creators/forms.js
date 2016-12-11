import {
    FORM_UPDATE_VALUES,
    FORM_UPDATE_DISPLAY,
    FORM_CLEAN
} from '../types/forms';

export const updateFormValues = (name, payload) => {
    return {
        type: FORM_UPDATE_VALUES,
        name,
        payload
    };
};

export const updateFormDisplay = (name, payload) => {
    return {
        type: FORM_UPDATE_DISPLAY,
        name,
        payload
    };
};

export const cleanForm = (name) => {
    return {
        type: FORM_CLEAN,
        name
    };
};

export const resetForms = () => {
    return (dispatch, getState) => {
        const { forms } = getState();
        Object.keys(forms).forEach(form => {
            dispatch(cleanForm(form));
        });
    };
};