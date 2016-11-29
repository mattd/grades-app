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
        teacher: state.teacher
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

const getLinkActiveStyles = (muiTheme) => {
    return {
        display: 'block',
        background: muiTheme.palette.borderColor
    };
};

const cardStyleOverrides = {
    boxShadow: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    // Needed so TouchRipple doesn't escape the bounds.
    transform: 'translate(0, 0)'
};

const ProfileCard = ({
    muiTheme,
    teacher,
    actionCreators
}) => {
    return (
        <Link
            to="/profile"
            activeStyle={getLinkActiveStyles(muiTheme)}
        >
            <Card
                onClick={onClick.bind(null, actionCreators)}
                style={cardStyleOverrides}
            >
                <TouchRipple>
                    <CardHeader
                        avatar={teacher.photoURL}
                        title={teacher.displayName}
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