import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActionCreators from '../../action-creators/auth';
import Link from '../link';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        children: state.auth.isAuthenticated ? 'Sign Out' : 'Sign In'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators(authActionCreators, dispatch)
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const { actionCreators } = dispatchProps;
    return {
        ...stateProps,
        onClick: () => {
            if (stateProps.isAuthenticated) {
                actionCreators.signOut();
            } else {
                actionCreators.signIn();
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Link);