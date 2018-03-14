import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AuthButton from './auth-button';
import MenuButton from './menu-button';

const styleSheet = {
      typography: {
          flex: 1
      }
};

export default withStyles(
    styleSheet,
    {name: 'AppBar'}
)(
    ({ classes }) => {
        return (
            <AppBar>
                <Toolbar>
                    <MenuButton />
                    <Typography
                        variant="title"
                        color="inherit"
                        className={classes.typography}>
                        Grades App
                    </Typography>
                    <AuthButton />
                </Toolbar>
            </AppBar>
        );
    }
);
