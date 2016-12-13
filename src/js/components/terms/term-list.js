import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';

import { sortObject } from '../../utils/ordering';
import AddTerm from './add-term';

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        addingTerm: state.ui.addingTerm
    };
};

const getTerm = (term) => {
    return (
        <ListItem key={term.id} primaryText={term.name} />
    );
};

const TermList = ({
    terms,
    addingTerm
}) => {
    return (
        <div>
            <List>
                {sortObject(terms).map(getTerm)}
            </List>
            {addingTerm ? <p>Term Form</p> : <AddTerm />}
        </div>
    );
};

export default connect(mapStateToProps)(TermList);