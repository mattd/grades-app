import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const getComponentOrRedirect = (Component, props) => {
    const state = props.auth;
    const ComponentOrRedirect = (
        state.isAuthenticated ?
        <Component {...props} /> :
        <Redirect to={
            {
                pathname: '/authenticate',
                state: {
                    from: state.command.next
                }
            }
        }/>
    );
    return ComponentOrRedirect;
};

const MatchWhenAuthenticated = ({
    component: Component,
    ...rest
}) => {
    return (
        <Match
            {...rest}
            component={() => getComponentOrRedirect(Component, rest)}
        />
    );
};

export default connect(mapStateToProps)(MatchWhenAuthenticated);