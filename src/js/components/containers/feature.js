import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = (muiTheme) => {
    return {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '100%'
        },
        paper: {
            flex: 1,
            margin: muiTheme.spacing.desktopGutter
        }
    };
};

const Feature = ({
    muiTheme,
    title,
    children
}) => {
    return (
        <div style={styles(muiTheme).wrapper}>
            <Paper style={styles(muiTheme).paper}>
                <Toolbar>
                    <ToolbarTitle text={title} />
                </Toolbar>
                {children}
            </Paper>
        </div>
    );
};

export default muiThemeable()(Feature);