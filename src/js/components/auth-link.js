import React from 'react';
import { connect } from 'react-redux';

import { signOut, signIn } from '../action-creators/auth';
import Link from './link';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        children: state.auth.isAuthenticated ? 'Sign Out' : 'Sign In'
    };
};

const mergeProps = (stateProps, dispatchProps) => {
    const { dispatch } = dispatchProps;
    return {
        ...stateProps,
        onClick: () => {
            if (stateProps.isAuthenticated) {
                dispatch(signOut());
            } else {
                dispatch(signIn());
            }
        }
    };
};

export default connect(mapStateToProps, null, mergeProps)(Link);