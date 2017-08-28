import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AuthButton from './auth-button';
import MenuButton from './menu-button';

const styleSheet = {
      root: {
          marginTop: 30,
          width: '100%'
      },
      flex: {
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
                        type="title"
                        color="inherit"
                        className={classes.flex}>
                        Grades App
                    </Typography>
                    <AuthButton />
                </Toolbar>
            </AppBar>
        );
    }
);
