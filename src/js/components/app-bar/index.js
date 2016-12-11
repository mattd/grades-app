import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

import { toggleDrawer } from '../../actions/creators/ui';

import AuthButton from './auth-button';

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(
    ({ actionCreators }) => {
        return (
            <AppBar
                title="Grades App"
                iconElementRight={<AuthButton />}
                onLeftIconButtonTouchTap={actionCreators.toggleDrawer}
            />
        );
    }
);