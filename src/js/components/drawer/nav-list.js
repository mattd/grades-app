import * as R from 'ramda';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import {
    SocialPerson,
    ActionDateRange,
    ActionBook,
    SocialPeople,
} from 'material-ui-icons';

import { toggleDrawer } from '../../actions/creators/ui';

const SelectableList = makeSelectable(List);

const getTopLevelPath = (pathname) => {
    return (
        '/' +
        R.reject(
            R.isEmpty,
            pathname.split('/')
        )[0]
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        topLevelPath: getTopLevelPath(state.router.location.pathname)
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

const getListItem = (actionCreators, item, index) => {
    return (
        <ListItem
            value={item.topLevelPath}
            key={index}
            innerDivStyle={styles().innerDiv}
            leftIcon={item.icon}
            onClick={actionCreators.toggleDrawer}
        >
            <Link to={item.topLevelPath} style={styles().link}>
                {item.title}
            </Link>
        </ListItem>
    );
};

const NavList = ({
    isAuthenticated,
    topLevelPath,
    actionCreators
}) => {
    const list = [
        {topLevelPath: '/terms', title: 'Terms', icon: <ActionDateRange />},
        {topLevelPath: '/courses', title: 'Courses', icon: <ActionBook />},
        {topLevelPath: '/students', title: 'Students', icon: <SocialPeople />}
    ];

    if (!isAuthenticated) {
        list.unshift({
            topLevelPath: '/profile',
            title: 'Profile',
            icon: <SocialPerson />
        });
    }

    return (
        <SelectableList value={topLevelPath} onChange={() => {}}>
            {list.map(getListItem.bind(null, actionCreators))}
        </SelectableList>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavList);