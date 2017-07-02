import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Card, { CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
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
            textTransform: 'none',
            display: 'block',
            width: '250px'
        },
        cardHeader: {
            paddingBottom: '20px'
        }
    };
};

const ProfileCard = ({
    theme,
    profile,
    actionCreators
}) => {
    const name = (
        <Typography type='subheading'>
            {profile.displayName}
        </Typography>
    );
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
                        title={name}
                        subheader='Profile'
                        style={styles(theme).cardHeader}
                    />
                </Button>
            </Card>
        </NavLink>
    );
};

export default withTheme(
    connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
);