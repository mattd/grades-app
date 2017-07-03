import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { toggleDrawer } from '../../actions/creators/ui';

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
            <IconButton
                color="contrast"
                onClick={actionCreators.toggleDrawer}
            >
                <MenuIcon />
            </IconButton>
        );
    }
);