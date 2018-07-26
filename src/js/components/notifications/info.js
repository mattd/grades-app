import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import { closeInfo, clearInfo } from 'actions/creators/info';

const mapStateToProps = (state) => {
    return {
        info: state.info
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            closeInfo,
            clearInfo
        }, dispatch)
    };
};

const InfoNotification = ({
    info,
    actionCreators
}) => {
    return (
        <Snackbar
            open={info.open}
            message={info.message}
            autoHideDuration={4000}
            onClose={actionCreators.closeInfo}
            onExited={actionCreators.clearInfo}
        />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoNotification);