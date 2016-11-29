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

const ProfileCard = ({
    muiTheme,
    teacher,
    actionCreators
}) => {
    return (
        <Link
            to="/profile"
            activeStyle={{
                display: 'block',
                background: muiTheme.palette.borderColor
            }}
        >
            <Card
                onClick={onClick.bind(null, actionCreators)}
                style={{
                    boxShadow: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    // Needed so TouchRipple doesn't escape the bounds.
                    transform: 'translate(0, 0)'
                }}
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