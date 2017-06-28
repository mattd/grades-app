import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TouchRipple from 'material-ui/internal/TouchRipple';
import { Card, CardHeader } from 'material-ui/Card';
import { withTheme } from 'material-ui/styles';

import { toggleDrawer } from '../../actions/creators/ui';

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
    };
};

const onClick = (actionCreators) => {
    actionCreators.toggleDrawer();
};

const styles = (theme) => {
    return {
        linkActive: {
            display: 'block',
            background: theme.palette.grey[300]
        },
        card: {
            boxShadow: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            // Needed so TouchRipple doesn't escape the bounds.
            transform: 'translate(0, 0)'
        }
    };
};

const ProfileCard = ({
    theme,
    profile,
    actionCreators
}) => {
    return (
        <NavLink
            to="/profile"
            activeStyle={styles(theme).linkActive}
        >
            <Card
                onClick={onClick.bind(null, actionCreators)}
                style={styles(theme).card}
            >
                <TouchRipple>
                    <CardHeader
                        avatar={profile.photoURL}
                        title={profile.displayName}
                        subtitle='Profile'
                    />
                </TouchRipple>
            </Card>
        </NavLink>
    );
};

export default withTheme(
    connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
);