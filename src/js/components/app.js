import React from 'react';
import { connect } from 'react-redux';

import { Page } from './containers';
import Matches from './matches';
import Loading from './loading';
import AppBar from './app-bar';
import Drawer from './drawer';
import BuildNotification from './notifications/build';

const mapStateToProps = (state) => {
    return {
        ready: state.auth.ready
    };
};

const App = ({
    ready
}) => {
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
