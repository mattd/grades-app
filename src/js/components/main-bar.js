import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

import * as uiActionCreators from '../actions/creators/ui';

import { AuthButton } from './auth';

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators(uiActionCreators, dispatch)
    };
};

class MainBar extends React.Component {
    render() {
        const { actionCreators } = this.props;
        return (
            <AppBar
                title="Grades App"
                iconElementRight={<AuthButton />}
                onLeftIconButtonTouchTap={actionCreators.toggleDrawer}
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MainBar);