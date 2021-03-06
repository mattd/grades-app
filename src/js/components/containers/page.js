import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = theme => {
    const whenSmall = '56px';
    const whenBig = '64px';
    return {
        root: {
            position: 'absolute',
            width: '100%',
            top: whenSmall,
            height: `calc(100% - ${whenSmall})`,
            [theme.breakpoints.up('sm')]: {
                top: whenBig,
                height: `calc(100% - ${whenBig})`
            }
        }
    };
};

const Page = ({
    classes,
    children
}) => {
    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};

export default withStyles(
    styleSheet,
    {name: 'Page'}
)(Page);