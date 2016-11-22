import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';

import history from './history';
import { navigate } from './actions/creators/router';

const mapStateToProps = (state) => {
    return {
        router: state.router
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            navigate
        }, dispatch)
    };
};

const onChange = (actionCreators, router, location, action) => {
    if (action === 'SYNC') {
        actionCreators.navigate(location, router.action);
    } else {
        actionCreators.navigate(location, action);
    }
};

const Router = ({
    router,
    actionCreators,
    children
}) => {
    return (
        <BrowserRouter
            history={history}
            location={router.location}
            action={router.action}
            onChange={onChange.bind(null, actionCreators, router)}
        >
            {children}
        </BrowserRouter>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);