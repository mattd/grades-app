import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import { BUILD_TIMESTAMP } from '../../utils/build';

const mapStateToProps = (state) => {
    return {
        build: state.build
    };
};

const BuildNotification = ({
    build
}) => {
    return (
        <Snackbar
            open={BUILD_TIMESTAMP < build.timestamp}
            message='A new version of Grades App is available'
            action='refresh'
            onActionTouchTap={() => window.location.reload(true)}
        />
    );
};

export default connect(mapStateToProps)(BuildNotification);