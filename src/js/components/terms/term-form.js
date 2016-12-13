import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { MuiTextField } from '../forms/fields';

const validate = (values) => {
    const errors = {};
    const requiredFields = ['name'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    return errors;
}

const onSubmit = (values) => {
    window.console.log(values);
};

const TermForm = ({
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field
                name="name"
                component={MuiTextField}
                label="Name"
                autoFocus={true}
            />
        </form>
    );
};

export default reduxForm({form: 'term', validate})(TermForm);