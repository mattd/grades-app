import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';

import * as uiActionCreators from '../actions/creators/ui';

import MainMenu from './main-menu';

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

export default connect(mapStateToProps, mapDispatchToProps)(
    ({
        drawerOpen,
        actionCreators
    }) => {
        return (
            <Drawer
                docked={false}
                open={drawerOpen}
                onRequestChange={actionCreators.toggleDrawer}
            >
                <MainMenu />
            </Drawer>
        );
    }
);