import React from 'react';
import { connect } from 'react-redux';

import { sortObject } from '../../lib/firebase';
import TermForm from './term-form';
import AddTerm from './add-term';

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        addingTerm: state.ui.addingTerm
    };
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
                {sortObject(terms).map(getTerm)}
            </ul>
            {addingTerm ? <TermForm /> : <AddTerm />}
        </div>
    );
};

export default connect(mapStateToProps)(TermList);