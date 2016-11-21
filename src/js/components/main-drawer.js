import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import * as uiActionCreators from '../actions/creators/ui';

const mapStateToProps = (state) => {
    return {
        drawerOpen: state.ui.drawerOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators(uiActionCreators, dispatch)
    };
};

class MainDrawer extends React.Component {
    render() {
        const { drawerOpen, actionCreators } = this.props;
        return (
            <Drawer
                docked={false}
                open={drawerOpen}
                onRequestChange={actionCreators.toggleDrawer}
            >
                <MenuItem>Item One</MenuItem>
                <MenuItem>Item Two</MenuItem>
            </Drawer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer);