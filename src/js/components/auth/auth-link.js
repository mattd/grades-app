import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authSyncActionCreators from '../../action-creators/sync/auth';
import Link from '../link';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        children: state.auth.isAuthenticated ? 'Sign Out' : 'Sign In'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            sync: bindActionCreators(authSyncActionCreators, dispatch)
        }
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const { actions } = dispatchProps;
    return {
        ...stateProps,
        onClick: () => {
            if (stateProps.isAuthenticated) {
                actions.sync.signOut();
            } else {
                actions.sync.signIn();
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Link);