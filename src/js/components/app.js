import React from 'react';
import { connect } from 'react-redux';

import { AuthenticatedMatches, UnauthenticatedMatches } from './matches';
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
    const Matches = (
        isAuthenticated ?
        AuthenticatedMatches :
        UnauthenticatedMatches
    );

    if (!ready) {
        return <Loading />;
    } else {
        return (
            <div>
                <AppBar />
                <Drawer />
                <Page>
                    <Matches />
                </Page>
                <BuildNotification />
            </div>
        );
    }
};

export default connect(mapStateToProps)(App);
