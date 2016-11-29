import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';

import { toggleDrawer } from '../../actions/creators/ui';

import ProfileCard from './profile-card';
import NavList from './nav-list';

const mapStateToProps = (state) => {
    return {
        drawerOpen: state.ui.drawerOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
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
                <ProfileCard />
                <NavList />
            </Drawer>
        );
    }
);