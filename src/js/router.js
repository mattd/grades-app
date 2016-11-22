import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';

import history from './history';
import * as routerActionCreators from './actions/creators/router';

const mapStateToProps = (state) => {
    return {
        location: state.router.location,
        action: state.router.action
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators(routerActionCreators, dispatch)
    };
};

class Router extends React.Component {
    onChange(location, action) {
        const { actionCreators } = this.props;

        if (action === 'SYNC') {
            actionCreators.navigate(location, this.props.action);
        } else {
            actionCreators.navigate(location, action);
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