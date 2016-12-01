import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

const getStylesWithTheme = (muiTheme) => {
    return {
        margin: muiTheme.spacing.desktopGutter
    };
};

const Page = ({
    muiTheme,
    children
}) => {
    const styles = getStylesWithTheme(muiTheme);
    return (
        <div style={styles}>
            {children}
        </div>
    );
};

export default muiThemeable()(Page)