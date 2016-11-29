import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Card, CardHeader } from 'material-ui/Card';

import { toggleDrawer } from '../../actions/creators/ui';

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
    actionCreators
}) => {
    return (
        <Link to="/profile">
            <Card
                onClick={onClick.bind(null, actionCreators)}
                style={{
                    boxShadow: 'none',
                    cursor: 'pointer'
                }}
            >
                <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                />
            </Card>
        </Link>
    );
};

export default connect(null, mapDispatchToProps)(ProfileCard);