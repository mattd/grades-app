import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import {
    updateTermValues,
    updateTermDisplay,
    setTerm
} from '../../actions/creators/terms';
import { cleanForm } from '../../actions/creators/forms';
import { toggleAddingTerm } from '../../actions/creators/ui';

const mapStateToProps = (state) => {
    return {
        focused: state.forms.term.display.focused,
        values: state.forms.term.values
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            updateTermValues,
            updateTermDisplay,
            setTerm,
            cleanForm,
            toggleAddingTerm
        }, dispatch)
    };
};

const onSubmit = (values, actionCreators, event) => {
    event.preventDefault();

    actionCreators.setTerm(values);
    actionCreators.cleanForm('term');
    actionCreators.toggleAddingTerm();
};

const onChange = (actionCreators, event) => {
    actionCreators.updateTermValues({
        name: event.target.value
    });
};

const onFocus = (actionCreators) => {
    actionCreators.updateTermDisplay({
        focused: 'name'
    });
};

const onBlur = (actionCreators) => {
    actionCreators.updateTermDisplay({
        focused: null
    });
};

const TermForm = ({
    focused,
    values,
    actionCreators
}) => {
    return (
        <form onSubmit={onSubmit.bind(null, values, actionCreators)}>
            <TextField
                hintText="Name"
                autoFocus={focused === 'name'}
                onChange={onChange.bind(null, actionCreators)}
                onFocus={onFocus.bind(null, actionCreators)}
                onBlur={onBlur.bind(null, actionCreators)}
            />
        </form>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TermForm);