import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Feature } from 'components/containers';
import Loading from 'components/loading';
import TermDetailMenu from './menu';

const mapStateToProps = (state) => {
    return {
        terms: state.terms
    };
};

const TermDetailFeature = ({
    terms,
    match
}) => {
    const id = match.params.id;

    if (R.isEmpty(terms)) {
        return <Loading />;
    } else if (!terms[id]) {
        return <h2>404</h2>;
    } else {
        return (
            <Feature
                title={<Link to="/terms">Terms</Link>}
                subtitle={`${terms[id].name}`}
                menu={<TermDetailMenu termId={id} />}
            >
                <p>ID: {match.params.id}</p>
            </Feature>
        );
    }
};

export default connect(mapStateToProps)(TermDetailFeature);
