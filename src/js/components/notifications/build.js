import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
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
    const action = (
        <Button
            color='accent'
            onClick={() => window.location.reload(true)}
        >
            Refresh
        </Button>
    );
    return (
        <Snackbar
            open={BUILD_TIMESTAMP < build.timestamp}
            message='A new version of Grades App is available'
            action={action}
        />
    );
};

export default connect(mapStateToProps)(BuildNotification);