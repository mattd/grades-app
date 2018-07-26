import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';

import { toggleDrawer } from 'actions/creators/ui';

import ProfileCard from './profile-card';
import NavList from './nav-list';

const mapStateToProps = (state) => {
    return {
        drawerOpen: state.ui.drawerOpen,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        drawerOpen,
        isAuthenticated,
        actionCreators
    }) => {
        return (
            <Drawer
                open={drawerOpen}
                onClose={actionCreators.toggleDrawer}
            >
                {isAuthenticated && <ProfileCard />}
                <NavList />
            </Drawer>
        );
    }
);