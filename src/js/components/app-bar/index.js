import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import { toggleDrawer } from '../../actions/creators/ui';

import AuthButton from './auth-button';

const styleSheet = createStyleSheet('ButtonAppBar', {
      root: {
          marginTop: 30,
          width: '100%',
      },
      flex: {
          flex: 1,
      }
});

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
    };
};

export default withStyles(styleSheet)(
    connect(null, mapDispatchToProps)(
        ({ classes }) => {
            return (
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast">
                            <MenuIcon />
                        </IconButton>
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
    )
);