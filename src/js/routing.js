import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';

import { navigate } from './action-creators/router';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

let MatchWhenAuthenticated = ({
    component: Component,
    ...rest
}) => {
    const dispatch = rest.dispatch;
    const state = rest.auth;

    if (!state.isAuthenticated) {
        dispatch(navigate('/authenticate', {from: state.command.next}));
    }
    return <Match {...rest} component={Component} />;
};

MatchWhenAuthenticated = connect(mapStateToProps)(MatchWhenAuthenticated);

export { MatchWhenAuthenticated };