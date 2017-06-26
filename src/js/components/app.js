import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes';
import Loading from './loading';
import AppBar from './app-bar';
import Drawer from './drawer';
import { Page } from './containers';
import BuildNotification from './notifications/build';

const mapStateToProps = (state) => {
    return {
        ready: state.auth.ready,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const App = ({
    ready,
    isAuthenticated
}) => {
    const Routes = (
        isAuthenticated ?
        AuthenticatedRoutes :
        UnauthenticatedRoutes
    );

    if (!ready) {
        return <Loading />;
    } else {
        return (
            <div>
                <AppBar />
                <Drawer />
                <Page>
                    <Routes />
                </Page>
                <BuildNotification />
            </div>
        );
    }
};

export default withRouter(connect(mapStateToProps)(App));
