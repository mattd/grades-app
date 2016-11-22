import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, makeSelectable } from 'material-ui/List';

import * as routerActionCreators from '../actions/creators/router';
import * as uiActionCreators from '../actions/creators/ui';

const SelectableList = makeSelectable(List);

const mapStateToProps = (state) => {
    return {
        pathname: state.router.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            ...uiActionCreators,
            ...routerActionCreators
        }, dispatch)
    };
};

const list = [
    {pathname: '/', title: 'Home'},
    {pathname: '/courses', title: 'Courses'},
    {pathname: '/students', title: 'Students'},
    {pathname: '/authenticate', title: 'Authenticate'},
];

const getListItem = (item, index) => {
    return (
        <ListItem value={item.pathname} key={index}>
            {item.title}
        </ListItem>
    );
};

const onChange = function (event, value) {
    this.actionCreators.navigate({
        pathname: value
    });
    this.actionCreators.toggleDrawer()
};

const NavList = ({
    pathname,
    actionCreators
}) => {
    return (
        <SelectableList
            value={pathname}
            onChange={onChange.bind({actionCreators})}
        >
            {list.map(getListItem)}
        </SelectableList>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavList);