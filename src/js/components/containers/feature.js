import React from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('Feature', theme => {
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
        content: {
            padding: theme.spacing.unit * 2,
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing.unit * 3
            }
        },
        subtitle: {
            color: theme.palette.grey[500],
            marginLeft: '24px'
        }
    };
});

const maybeGetSubtitle = (subtitle, classes) => {
    if (subtitle) {
        return <h3 className={classes.subtitle}>{subtitle}</h3>;
    }
};

const Feature = ({
    classes,
    title,
    subtitle,
    children
}) => {
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Toolbar>
                    <h2>
                        {title}
                    </h2>
                    {maybeGetSubtitle(subtitle, classes)}
                </Toolbar>
                <div className={classes.content}>
                    {children}
                </div>
            </Paper>
        </div>
    );
};

export default withStyles(styleSheet)(Feature);