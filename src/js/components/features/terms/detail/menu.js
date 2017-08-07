import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import { toggleTermDetailMenu } from 'actions/creators/ui';

const mapStateToProps = (state) => {
    return {
        termDetailMenuOpen: state.ui.termDetailMenuOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleTermDetailMenu
        }, dispatch)
    };
};

class TermDetailMenu extends React.Component {
    render() {
        const { termDetailMenuOpen, actionCreators } = this.props;
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
                    open={this.anchorEl && termDetailMenuOpen}
                    onRequestClose={actionCreators.toggleTermDetailMenu}
                >
                    <MenuItem onClick={actionCreators.toggleTermDetailMenu}>
                        Delete
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermDetailMenu);