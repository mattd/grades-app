import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { startAddingTerm } from '../../actions/creators/ui';

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
        label: 'Add Term',
        primary: true,
        onTouchTap: actionCreators.startAddingTerm
    };
};

export default connect(
    null,
    mapDispatchToProps,
    mergeProps
)(RaisedButton);