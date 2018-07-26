import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { toggleDrawer } from 'actions/creators/ui';

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
    };
};

const MenuButton = ({
    actionCreators
}) => {
    return (
        <IconButton
            color="inherit"
            onClick={actionCreators.toggleDrawer}
        >
            <MenuIcon />
        </IconButton>
    );
};

export default connect(
    null,
    mapDispatchToProps
)(MenuButton);