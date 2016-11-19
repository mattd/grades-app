import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';

import history from './history';
import * as routerSyncActionCreators from './action-creators/sync/router';

const mapStateToProps = (state) => {
    return {
        location: state.router.location,
        action: state.router.action
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            sync: bindActionCreators(routerSyncActionCreators, dispatch)
        }
    };
};

class Router extends React.Component {
    onChange(location, action) {
        const { actions } = this.props;

        if (action === 'SYNC') {
            actions.sync.navigate(location, this.props.action);
        } else {
            actions.sync.navigate(location, action);
        }
    }

    render() {
        return (
            <BrowserRouter
                history={history}
                location={this.props.location}
                action={this.props.action}
                onChange={this.onChange.bind(this)}
            >
                {this.props.children}
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);