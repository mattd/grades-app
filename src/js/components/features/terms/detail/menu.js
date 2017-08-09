import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import { removeTerm } from 'actions/creators/terms';
import {
    toggleTermDetailMenu,
    setTermDetailMenuOpen
} from 'actions/creators/ui';

const mapStateToProps = (state) => {
    return {
        uid: state.profile.uid,
        termDetailMenuOpen: state.ui.termDetailMenuOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            push,
            removeTerm,
            toggleTermDetailMenu,
            setTermDetailMenuOpen
        }, dispatch)
    };
};

class TermDetailMenu extends React.Component {
    handleDeleteClick() {
        const { actionCreators, uid, termId } = this.props;
        actionCreators.push('/terms');
        actionCreators.removeTerm(uid, termId);
    }
    componentDidMount() {
        const { termDetailMenuOpen } = this.props;
        if (!this.readyToOpen && termDetailMenuOpen) {
            this.forceUpdate();
        }
    }
    componentWillUnmount() {
        const { actionCreators } = this.props;
        actionCreators.setTermDetailMenuOpen(false);
    }
    render() {
        const { termDetailMenuOpen, actionCreators } = this.props;
        this.readyToOpen = this.anchorEl && termDetailMenuOpen;
        return (
            <div>
                <div
                    onClick={actionCreators.toggleTermDetailMenu}
                    ref={el => this.anchorEl = el}
                >
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <Menu
                    anchorEl={this.anchorEl}
                    open={this.readyToOpen}
                    onRequestClose={actionCreators.toggleTermDetailMenu}
                >
                    <MenuItem onClick={this.handleDeleteClick.bind(this)}>
                        Delete
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermDetailMenu);