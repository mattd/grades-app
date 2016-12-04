import React from 'react';
import { connect } from 'react-redux';

import { getTermsPath } from '../services/terms';
import {
    subscribeToTerms,
    unsubscribeFromTerms,
    flushTerms
} from '../actions/creators/terms';
import { Feature } from '../components/containers';

const mapStateToProps = (state) => {
    return {
        db: state.db,
        uid: state.profile.uid
    };
};

class Terms extends React.Component {
    componentWillMount() {
        const { db, uid, dispatch } = this.props;

        if (!db[getTermsPath(uid)]) {
            dispatch(subscribeToTerms(uid));
        }
    }

    componentWillUnmount() {
        const { uid, dispatch } = this.props;

        if (uid) dispatch(unsubscribeFromTerms(uid));
        dispatch(flushTerms());
    }

    render() {
        return (
            <Feature title="Terms" />
        );
    }
}

export default connect(mapStateToProps)(Terms);