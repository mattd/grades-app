import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Card, { CardHeader } from 'material-ui/Card';
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

const onTouchTap = (actionCreators) => {
    actionCreators.toggleDrawer();
};

const styles = (theme) => {
    return {
        linkActive: {
            display: 'block',
            background: theme.palette.grey[300]
        },
        card: {
            paddingBottom: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent'
        },
        button: {
            textAlign: 'left',
            padding: 0,
            textTransform: 'none'
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
                onTouchTap={onTouchTap.bind(null, actionCreators)}
                style={styles(theme).card}
            >
                <Button style={styles(theme).button}>
                    <CardHeader
                        avatar={<Avatar src={profile.photoURL} />}
                        title={<h2>{profile.displayName}</h2>}
                        subheader='Profile'
                    />
                </Button>
            </Card>
        </NavLink>
    );
};

export default withTheme(
    connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
);