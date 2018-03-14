import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import { signIn, signOut } from 'actions/creators/auth';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        children: state.auth.isAuthenticated ? 'Sign Out' : 'Sign In'
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
        children: stateProps.children,
        color: 'inherit',
        onClick: () => {
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
)(Button);