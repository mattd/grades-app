import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import { BUILD_TIMESTAMP } from 'utils/build';

const mapStateToProps = (state) => {
    return {
        build: state.build.data
    };
};

const BuildNotification = ({
    build
}) => {
    const action = (
        <Button
            color='secondary'
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