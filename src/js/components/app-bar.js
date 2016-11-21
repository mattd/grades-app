import React from 'react';
import AppBar from 'material-ui/AppBar';

import { AuthButton } from './auth';

export default () => {
    return (
        <AppBar
            title="Grades App"
            iconElementRight={<AuthButton />}
        />
    );
};