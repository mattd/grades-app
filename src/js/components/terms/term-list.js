import uuid from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';

import { sortObject } from '../../utils/ordering';
import TermForm from './term-form';
import AddTerm from './add-term';

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        addingTerm: state.ui.addingTerm
    };
};

const styles = () => {
    return {
        innerDiv: {
            padding: 0
        },
        link: {
            padding: 16,
            display: 'block'
        }
    };
};

const getTerm = (term) => {
    return (
        <ListItem key={term.id} innerDivStyle={styles().innerDiv}>
            <Link to={`/terms/${term.id}`} style={styles().link}>
                {term.name}
            </Link>
        </ListItem>
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