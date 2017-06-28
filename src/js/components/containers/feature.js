import React from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import { withTheme } from 'material-ui/styles';

const styles = (theme) => {
    return {
        subtitle: {
            color: theme.palette.grey[500],
            marginLeft: '24px'
        }
    };
};

const maybeGetSubtitle = (subtitle, styles) => {
    if (subtitle) {
        return <h3 style={styles}>{subtitle}</h3>;
    }
};

const Feature = ({
    theme,
    title,
    subtitle,
    children
}) => {
    return (
        <Paper>
            <Toolbar>
                <h2>
                    {title}
                </h2>
                {maybeGetSubtitle(subtitle, styles(theme).subtitle)}
            </Toolbar>
            <div>
                {children}
            </div>
        </Paper>
    );
};

export default withTheme(Feature);