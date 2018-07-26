import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Person, DateRange, Book, People } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

import { toggleDrawer } from 'actions/creators/ui';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators({
            toggleDrawer
        }, dispatch)
    };
};

const getListItem = (theme, actionCreators, item, index) => {
    return (
        <NavLink
            to={item.path}
            key={index}
            onClick={actionCreators.toggleDrawer}
            style={{display: 'block'}}
            activeStyle={{background: theme.palette.grey[400]}}
        >
            <ListItem key={index} button>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
            </ListItem>
        </NavLink>
    );
};

const NavList = ({
    theme,
    actionCreators,
    isAuthenticated
}) => {
    const list = [
        {path: '/terms', title: 'Terms', icon: <DateRange />},
        {path: '/courses', title: 'Courses', icon: <Book />},
        {path: '/students', title: 'Students', icon: <People />}
    ];

    if (!isAuthenticated) {
        list.unshift({
            path: '/profile',
            title: 'Profile',
            icon: <Person />
        });
    }

    return (
        <List>
            {list.map(getListItem.bind(null, theme, actionCreators))}
        </List>
    );
}

export default withTheme()(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(NavList)
);