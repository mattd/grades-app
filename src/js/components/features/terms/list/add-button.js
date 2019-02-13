import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { startAddingTerm } from 'actions/creators/terms';

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            startAddingTerm
        }, dispatch)
    };
};

const mergeProps = (stateProps, dispatchProps) => {
    const { actionCreators } = dispatchProps;
    return {
        children: 'Add Term',
        color: 'primary',
        variant: 'contained',
        onClick: actionCreators.startAddingTerm
    };
};

export default connect(
    null,
    mapDispatchToProps,
    mergeProps
)(Button);