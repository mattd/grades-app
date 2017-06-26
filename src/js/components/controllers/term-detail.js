import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Feature } from '../containers';
import Loading from '../loading';

const mapStateToProps = (state) => {
    return {
        terms: state.terms
    };
};

const Terms = ({
    terms,
    match
}) => {
    if (R.isEmpty(terms)) {
        return <Loading />;
    } else {
        return (
            <Feature
                title={<Link to="/terms">Terms</Link>}
                subtitle={`${terms[match.params.id].name}`}
            >
                <p>ID: {match.params.id}</p>
            </Feature>
        );
    }
};

export default connect(mapStateToProps)(Terms);