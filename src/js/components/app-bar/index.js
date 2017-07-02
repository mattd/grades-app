import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import AuthButton from './auth-button';
import MenuButton from './menu-button';

const styleSheet = createStyleSheet('ButtonAppBar', {
      root: {
          marginTop: 30,
          width: '100%',
      },
      flex: {
          flex: 1,
      }
});

export default withStyles(styleSheet)(
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
