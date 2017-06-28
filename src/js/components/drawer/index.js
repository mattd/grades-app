import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';

import { toggleDrawer } from '../../actions/creators/ui';

//import ProfileCard from './profile-card';

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

export default connect(mapStateToProps, mapDispatchToProps)(
    ({
        drawerOpen,
        //isAuthenticated,
        actionCreators
    }) => {
        return (
            <Drawer
                docked={false}
                open={drawerOpen}
                onRequestClose={actionCreators.toggleDrawer}
            >
                <h2>This is a drawer.</h2>
            </Drawer>
        );
    }
);