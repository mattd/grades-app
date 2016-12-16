import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';

import history from '../history';
import { navigate } from '../actions/creators/router';

const mapStateToProps = (state) => {
    return {
        state: state.router
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            navigate
        }, dispatch)
    };
};

const onChange = (actionCreators, state, location, action) => {
    if (action === 'SYNC') {
        actionCreators.navigate(location, state.action);
    } else {
        actionCreators.navigate(location, action);
    }
};

const Router = ({
    state,
    actionCreators,
    children
}) => {
    return (
        <BrowserRouter
            history={history}
            location={state.location}
            action={state.action}
            onChange={onChange.bind(null, actionCreators, state)}
        >
            {children}
        </BrowserRouter>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);