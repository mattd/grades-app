import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List, ListItem, makeSelectable } from 'material-ui/List';

import { toggleDrawer } from '../../actions/creators/ui';

const SelectableList = makeSelectable(List);

const mapStateToProps = (state) => {
    return {
        pathname: state.router.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
    };
};

const itemStyleOverrides = {
    padding: 0
};

const linkStyleOverrides = {
    padding: 16,
    display: 'block'
};

const getListItem = (item, index) => {
    return (
        <ListItem
            value={item.pathname}
            key={index}
            innerDivStyle={itemStyleOverrides}
        >
            <Link to={item.pathname} style={linkStyleOverrides}>
                {item.title}
            </Link>
        </ListItem>
    );
};

const onChange = (actionCreators) => {
    actionCreators.toggleDrawer();
};

const NavList = ({
    pathname,
    actionCreators
}) => {
    const list = [
        {pathname: '/terms', title: 'Terms'},
        {pathname: '/courses', title: 'Courses'},
        {pathname: '/students', title: 'Students'}
    ];
    return (
        <SelectableList
            value={pathname}
            onChange={onChange.bind(null, actionCreators)}
        >
            {list.map(getListItem)}
        </SelectableList>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavList);