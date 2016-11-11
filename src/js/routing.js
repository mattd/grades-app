import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const chooseComponentOrRedirect = (Component, props) => {
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

let MatchWhenAuthenticated = ({
    component: Component,
    ...rest
}) => {
    return (
        <Match
            {...rest}
            component={() => chooseComponentOrRedirect(Component, rest)}
        />
    );
};

MatchWhenAuthenticated = connect(mapStateToProps)(MatchWhenAuthenticated);

export { MatchWhenAuthenticated };