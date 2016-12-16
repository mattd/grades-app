import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTermsPath } from '../../services/terms';
import {
    subscribeToTerms,
    unsubscribeFromTerms,
    flushTerms
} from '../../actions/creators/terms';
import { Feature } from '../containers';
import TermList from '../terms/term-list'

const mapStateToProps = (state) => {
    return {
        db: state.db,
        uid: state.profile.uid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            subscribeToTerms,
            unsubscribeFromTerms,
            flushTerms
        }, dispatch)
    };
};

class Terms extends React.Component {
    componentWillMount() {
        const { db, uid, actionCreators } = this.props;

        if (!db[getTermsPath(uid)]) {
            actionCreators.subscribeToTerms(uid);
        }
    }

    componentWillUnmount() {
        const { uid, actionCreators } = this.props;

        if (uid) actionCreators.unsubscribeFromTerms(uid);
        actionCreators.flushTerms();
    }

    render() {
        return (
            <Feature title="Terms">
                <TermList />
            </Feature>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Terms);