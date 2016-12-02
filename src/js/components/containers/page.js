import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = (muiTheme) => {
    const height = muiTheme.appBar.height + 'px';
    return {
        wrapper: {
            position: 'absolute',
            top: height,
            height: `calc(100% - ${height})`,
            width: '100%'
        }
    };
};

const Page = ({
    muiTheme,
    children
}) => {
    return (
        <div style={styles(muiTheme).wrapper}>
            {children}
        </div>
    );
};

export default muiThemeable()(Page);