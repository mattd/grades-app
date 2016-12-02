import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import {
    SocialPerson,
    ActionDateRange,
    ActionBook,
    SocialPeople,
} from 'material-ui/svg-icons';

import { toggleDrawer } from '../../actions/creators/ui';

const SelectableList = makeSelectable(List);

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
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

const styles = () => {
    return {
        innerDiv: {
            padding: 0
        },
        link: {
            padding: 16,
            paddingLeft: 72,
            display: 'block'
        }
    };
};

const getListItem = (item, index) => {
    return (
        <ListItem
            value={item.pathname}
            key={index}
            innerDivStyle={styles().innerDiv}
            leftIcon={item.icon}
        >
            <Link to={item.pathname} style={styles().link}>
                {item.title}
            </Link>
        </ListItem>
    );
};

const onChange = (actionCreators) => {
    actionCreators.toggleDrawer();
};

const NavList = ({
    isAuthenticated,
    pathname,
    actionCreators
}) => {
    const list = [
        {pathname: '/terms', title: 'Terms', icon: <ActionDateRange />},
        {pathname: '/courses', title: 'Courses', icon: <ActionBook />},
        {pathname: '/students', title: 'Students', icon: <SocialPeople />}
    ];

    if (!isAuthenticated) {
        list.unshift({
            pathname: '/profile', title: 'Profile', icon: <SocialPerson />
        });
    }

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