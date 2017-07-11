import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { setTerm, stopAddingTerm } from '../../../actions/creators/terms';
import { MuiTextField } from '../../forms/fields';

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            setTerm,
            stopAddingTerm
        }, dispatch)
    };
};

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

const onSubmit = (actionCreators, values) => {
    actionCreators.setTerm(values);
    actionCreators.stopAddingTerm();
};

const TermForm = ({
    handleSubmit,
    actionCreators
}) => {
    const handler = onSubmit.bind(null, actionCreators);
    return (
        <form onSubmit={handleSubmit(handler)}>
            <Field
                name="name"
                component={MuiTextField}
                label="Name"
                autoFocus={true}
            />
        </form>
    );
};

export default connect(null, mapDispatchToProps)(
    reduxForm({
        form: 'term',
        validate
    })(TermForm)
);