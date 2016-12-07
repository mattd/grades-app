import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';

import TermForm from './term-form';
import AddTerm from './add-term';

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        addingTerm: state.ui.addingTerm
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
    terms,
    addingTerm
}) => {
    return (
        <div>
            <ul>
                {sortTerms(terms).map(getTerm)}
            </ul>
            {addingTerm ? <TermForm /> : <AddTerm />}
        </div>
    );
};

export default connect(mapStateToProps)(TermList);