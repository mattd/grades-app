import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Feature } from '../containers';
import Loading from '../loading';

const mapStateToProps = (state) => {
    return {
        terms: state.terms
    };
};

const Terms = ({
    terms,
    params
}) => {
    if (R.isEmpty(terms)) {
        return <Loading />;
    } else {
        return (
            <Feature
                title={<Link to="/terms">Terms</Link>}
                subtitle={`${terms[params.id].name}`}
            >
                <p>ID: {params.id}</p>
            </Feature>
        );
    }
};

export default connect(mapStateToProps)(Terms);