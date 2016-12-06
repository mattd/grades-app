import React from 'react';
import { connect } from 'react-redux';

import { makeController } from '../controllers';
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

const willMount = ({
    db,
    uid,
    dispatch
}) => {
    if (!db[getTermsPath(uid)]) {
        dispatch(subscribeToTerms(uid));
    }
};

const willUnmount = ({
    uid,
    dispatch
}) => {
    if (uid) dispatch(unsubscribeFromTerms(uid));
    dispatch(flushTerms());
};

const Terms = () => {
    return (
        <Feature title="Terms" />
    );
};

export default connect(mapStateToProps)(
    makeController(willMount, willUnmount)(Terms)
);