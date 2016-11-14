import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';

import { navigate } from '../../action-creators/router';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        router: state.router
    };
};

class MatchWhenAuthenticated extends React.Component {
    navigateConditionally() {
        const { auth, router, dispatch, pattern } = this.props;

        if (
            !auth.isAuthenticated &&
            router.location.pathname === pattern
        ) {
            dispatch(navigate('/authenticate', {from: auth.command.next}));
        }
    }

    // TODO: Document why all of these lifecycle methods call the same func.
    componentWillMount() {
        this.navigateConditionally();
    }

    componentWillReceiveProps(nextProps) {
        this.navigateConditionally();
    }

    componentDidUpdate() {
        this.navigateConditionally();
    }

    render() {
        const { auth } = this.props;

        if (auth.isAuthenticated) {
            return <Match {...this.props} />;
        }
        return null;
    }
};

export default connect(mapStateToProps)(MatchWhenAuthenticated);