import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathname: state.router.location.pathname
    };
};

const chooseComponentOrRedirect = (Component, props) => {
    const ComponentOrRedirect = (
        props.isAuthenticated ?
        <Component {...props} /> :
        <Redirect to={{
            pathname: "/authenticate",
            state: {next: props.pathname}
        }} />
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
            render={(props) => {
                return chooseComponentOrRedirect(
                    Component, {...props, ...rest}
                );
            }}
        />
    );
};

export default connect(mapStateToProps)(MatchWhenAuthenticated);