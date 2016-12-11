import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TouchRipple from 'material-ui/internal/TouchRipple';
import { Card, CardHeader } from 'material-ui/Card';
import muiThemeable from 'material-ui/styles/muiThemeable';

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

const styles = (muiTheme) => {
    return {
        linkActive: {
            display: 'block',
            background: muiTheme.palette.borderColor
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
    muiTheme,
    profile,
    actionCreators
}) => {
    return (
        <Link
            to="/profile"
            activeStyle={styles(muiTheme).linkActive}
        >
            <Card
                onClick={onClick.bind(null, actionCreators)}
                style={styles(muiTheme).card}
            >
                <TouchRipple>
                    <CardHeader
                        avatar={profile.photoURL}
                        title={profile.displayName}
                        subtitle='Profile'
                    />
                </TouchRipple>
            </Card>
        </Link>
    );
};

export default muiThemeable()(
    connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
);