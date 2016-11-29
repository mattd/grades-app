import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TouchRipple from 'material-ui/internal/TouchRipple';
import { Card, CardHeader } from 'material-ui/Card';

import { toggleDrawer } from '../../actions/creators/ui';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
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
    isAuthenticated,
    teacher,
    actionCreators
}) => {
    if (!isAuthenticated) return null;
    return (
        <Link to="/profile">
            <Card
                onClick={onClick.bind(null, actionCreators)}
                style={{
                    boxShadow: 'none',
                    cursor: 'pointer',
                    // Needed so the TouchRipple doesn't escape the bounds.
                    transform: 'translate(0, 0)'
                }}
            >
                <TouchRipple>
                    <CardHeader
                        avatar={teacher.photoURL}
                        title={teacher.displayName}
                        subtitle={teacher.email}
                        subtitleStyle={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '88%'
                        }}
                    />
                </TouchRipple>
            </Card>
        </Link>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);