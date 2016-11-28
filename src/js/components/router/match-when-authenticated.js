import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const chooseComponentOrRedirect = (Component, props) => {
    const ComponentOrRedirect = (
        props.isAuthenticated ?
        <Component {...props} /> :
        // TODO: Figure out how to handle last path redirection.
        <Redirect to="/authenticate" />
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
            component={() => chooseComponentOrRedirect(Component, rest)}
        />
    );
};

export default connect(mapStateToProps)(MatchWhenAuthenticated);