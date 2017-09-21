import uuid from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

import { stopAddingTerm } from 'actions/creators/terms';
import { sortObject } from 'utils/ordering';
import { Feature } from 'components/containers';
import AddTermForm from './add-form';
import AddTermButton from './add-button';

const mapStateToProps = (state) => {
    return {
        terms: state.terms.data,
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

class TermListFeature extends React.Component {
    componentWillUnmount() {
        const { dispatch, addingTerm } = this.props;
        if (addingTerm) dispatch(stopAddingTerm());
    }
    render() {
        const { terms, addingTerm } = this.props;
        const form = <AddTermForm initialValues={{id: uuid()}} />;
        const button = <AddTermButton />;

        return (
            <Feature title="Terms">
                <List>
                    {sortObject(terms).map(getTerm)}
                </List>
                {addingTerm ? form : button}
            </Feature>
        );
    }
}

export default connect(mapStateToProps)(TermListFeature);