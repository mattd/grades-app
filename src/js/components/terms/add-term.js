import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { toggleAddingTerm } from '../../actions/creators/ui';

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleAddingTerm
        }, dispatch)
    };
};

const mergeProps = (stateProps, dispatchProps) => {
    const { actionCreators } = dispatchProps;
    return {
        label: 'Add Term',
        primary: true,
        onTouchTap: actionCreators.toggleAddingTerm
    };
};

export default connect(
    null,
    mapDispatchToProps,
    mergeProps
)(RaisedButton);