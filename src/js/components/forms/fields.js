import React from 'react';
import TextField from 'material-ui/TextField';

export const MuiTextField = ({
    input,
    label,
    meta: {
        touched,
        error
    },
    ...rest
}) => {
    return (
        <TextField
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...rest}
        />
    );
};