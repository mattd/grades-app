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
    const errorText = touched && error;
    return (
        <TextField
            label={label}
            InputProps={{placeholder: label}}
            error={!!errorText}
            helperText={errorText}
            {...input}
            {...rest}
        />
    );
};