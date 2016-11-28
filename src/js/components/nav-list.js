import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, makeSelectable } from 'material-ui/List';

import { navigate } from '../actions/creators/router';
import { toggleDrawer } from '../actions/creators/ui';

const SelectableList = makeSelectable(List);

const mapStateToProps = (state) => {
    return {
        pathname: state.router.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer,
            navigate
        }, dispatch)
    };
};

const onChange = (actionCreators, event, value) => {
    actionCreators.navigate({
        pathname: value
    });
    actionCreators.toggleDrawer()
};

const getListItem = (item, index) => {
    return (
        <ListItem value={item.pathname} key={index}>
            {item.title}
        </ListItem>
    );
};

const NavList = ({
    pathname,
    actionCreators
}) => {
    const list = [
        {pathname: '/profile', title: 'Profile'},
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