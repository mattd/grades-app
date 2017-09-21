import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import { setTerm, stopAddingTerm } from 'actions/creators/terms';
import { MuiTextField } from 'components/forms/fields';

const styleSheet = theme => {
    const unit = `${theme.spacing.unit}px`;
    return {
        button: {
            margin: `${unit} ${unit} ${unit} 0`,
        }
    };
};

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

const AddTermForm = ({
    classes,
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
                onBlur={event => event.preventDefault()}
            />
            <div>
                <Button
                    raised
                    color='primary'
                    onClick={handleSubmit(handler)}
                    className={classes.button}
                >
                    Submit
                </Button>
                <Button
                    raised
                    onClick={actionCreators.stopAddingTerm}
                    className={classes.button}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default withStyles(
    styleSheet,
    {name: 'TermForm'}
)(
    connect(
        null,
        mapDispatchToProps
    )(
        reduxForm({
            form: 'term',
            validate
        })(AddTermForm)
    )
);