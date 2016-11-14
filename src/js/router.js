import React from 'react';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';

import history from './history';

const mapStateToProps = (state) => {
    return {
        location: state.router.location,
        action: state.router.action
    };
};

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter
                history={history}
                location={this.props.location}
                action={this.props.action}
                onChange={() => {console.log('changed')}}
            >
                {this.props.children}
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps)(Router);