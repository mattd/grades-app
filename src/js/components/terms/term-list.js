import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        terms: state.terms
    };
};

const sortTerms = (terms) => {
    return (
        R.sortBy(
            R.prop('order')
        )(R.values(terms))
    );
};

const getTerm = (term) => {
    return (
        <li key={term.id}>{term.name}</li>
    );
};

const TermList = ({
    terms
}) => {
    return (
        <ul>
            {sortTerms(terms).map(getTerm)}
        </ul>
    );
};

export default connect(mapStateToProps)(TermList);