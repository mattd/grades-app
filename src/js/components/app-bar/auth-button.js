import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import { signIn, signOut } from '../../actions/creators/auth';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        label: state.auth.isAuthenticated ? 'Sign Out' : 'Sign In'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            signIn,
            signOut
        }, dispatch)
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { actionCreators } = dispatchProps;
    return {
        ...ownProps,
        label: stateProps.label,
        onTouchTap: () => {
            if (stateProps.isAuthenticated) {
                actionCreators.signOut();
            } else {
                actionCreators.signIn();
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(FlatButton);