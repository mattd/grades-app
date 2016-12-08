import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import { updateTerm } from '../../actions/creators/terms';

const mapStateToProps = (state) => {
    return {
        focused: state.forms.term.focused
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            updateTerm
        }, dispatch)
    };
};

const onSubmit = (event) => {
    event.preventDefault();
};

const onChange = (actionCreators, event) => {
    actionCreators.updateTerm({
        name: event.target.value
    });
};

const onFocus = (actionCreators) => {
    actionCreators.updateTerm({
        focused: 'name'
    });
};

const onBlur = (actionCreators) => {
    actionCreators.updateTerm({
        focused: null
    });
};

const TermForm = ({
    focused,
    actionCreators
}) => {
    return (
        <form onSubmit={onSubmit}>
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