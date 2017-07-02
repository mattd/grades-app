import uuid from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

import { sortObject } from '../../utils/ordering';
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
    const form = <TermForm initialValues={{id: uuid()}} />;
    const button = <AddTerm />;
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