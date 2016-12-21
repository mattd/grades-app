import React from 'react';
import Paper from 'material-ui/Paper';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = (muiTheme) => {
    return {
        outerWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '100%'
        },
        paper: {
            flex: 1,
            margin: muiTheme.spacing.desktopGutter
        },
        innerWrapper: {
            padding: muiTheme.spacing.desktopGutter
        },
        title: {
            fontSize: muiTheme.toolbar.titleFontSize,
            fontWeight: 400
        },
        subtitle: {
            color: muiTheme.palette.accent3Color,
            marginLeft: muiTheme.spacing.desktopGutter
        }
    };
};

const maybeGetSeparator = (subtitle) => {
    if (subtitle) return <ToolbarSeparator />;
};

const maybeGetSubtitle = (subtitle, styles) => {
    if (subtitle) {
        return <ToolbarTitle text={subtitle} style={styles} />;
    }
};

const Feature = ({
    muiTheme,
    title,
    subtitle,
    children
}) => {
    return (
        <div style={styles(muiTheme).outerWrapper}>
            <Paper style={styles(muiTheme).paper}>
                <Toolbar>
                    <ToolbarGroup>
                        <h2 style={styles(muiTheme).title}>
                            {title}
                        </h2>
                        {maybeGetSeparator(subtitle)}
                        {maybeGetSubtitle(subtitle, styles(muiTheme).subtitle)}
                    </ToolbarGroup>
                </Toolbar>
                <div style={styles(muiTheme).innerWrapper}>
                    {children}
                </div>
            </Paper>
        </div>
    );
};

export default muiThemeable()(Feature);