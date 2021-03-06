import React from 'react';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = theme => {
    return {
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '100%'
        },
        paper: {
            flex: 1,
            margin: theme.spacing.unit * 2,
            [theme.breakpoints.up('sm')]: {
                margin: theme.spacing.unit * 3
            }
        },
        toolbar: {
            backgroundColor: theme.palette.grey[200]
        },
        content: {
            padding: theme.spacing.unit * 2,
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing.unit * 3
            }
        },
        subtitle: {
            color: theme.palette.grey[500],
            marginLeft: '24px'
        },
        menu: {
            position: 'absolute',
            right: 0
        }
    };
};

const Feature = ({
    classes,
    title,
    subtitle,
    menu,
    children
}) => {
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant='title'>
                        {title}
                    </Typography>
                    <Typography variant='title' className={classes.subtitle}>
                        {subtitle}
                    </Typography>
                    <div className={classes.menu}>
                        {menu}
                    </div>
                </Toolbar>
                <div className={classes.content}>
                    {children}
                </div>
            </Paper>
        </div>
    );
};

export default withStyles(
    styleSheet,
    {name: 'Feature'}
)(Feature);