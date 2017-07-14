import uuid from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

import { sortObject } from '../../utils/ordering';
import AddTermForm from './add-form';
import AddTermButton from './add-button';

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        addingTerm: state.ui.addingTerm
    };
};

const getTerm = (term) => {
    return (
        <Link to={`/terms/${term.id}`} key={term.id}>
            <ListItem button>
                <ListItemText primary={term.name} />
            </ListItem>
        </Link>
    );
};

const TermList = ({
    terms,
    addingTerm
}) => {
    const form = <AddTermForm initialValues={{id: uuid()}} />;
    const button = <AddTermButton />;
    return (
        <div>
            <List>
                {sortObject(terms).map(getTerm)}
            </List>
            {addingTerm ? form : button}
        </div>
    );
};

export default connect(mapStateToProps)(TermList);