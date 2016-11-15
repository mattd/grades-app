import React from 'react';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';

import history from './history';
import { navigate } from './action-creators/router';

const mapStateToProps = (state) => {
    return {
        location: state.router.location,
        action: state.router.action
    };
};

class Router extends React.Component {
    onChange(location, action) {
        const { dispatch } = this.props;

        if (action === 'SYNC') {
            dispatch(navigate(location, this.props.action));
        } else {
            dispatch(navigate(location, action));
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

export default connect(mapStateToProps)(Router);