import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List, ListItem, makeSelectable } from 'material-ui/List';

import * as uiActionCreators from '../actions/creators/ui';

const SelectableList = makeSelectable(List);

const mapStateToProps = (state) => {
    return {
        pathname: state.router.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators(uiActionCreators, dispatch)
    };
};

const links = [
    {pathname: '/', title: 'Home', exact: true},
    {pathname: '/courses', title: 'Courses'},
    {pathname: '/students', title: 'Students'},
    {pathname: '/authenticate', title: 'Authenticate'},
];

const getListItem = (link, index) => {
    return (
        <ListItem
            value={link.pathname}
            key={index}
        >
            <Link to={link.pathname}>
                {link.title}
            </Link>
        </ListItem>
    );
};

const NavList = ({
    pathname,
    actionCreators
}) => {
    return (
        <SelectableList
            value={pathname}
            onChange={actionCreators.toggleDrawer}
        >
            {links.map(getListItem)}
        </SelectableList>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavList);