import React from 'react';
import { Link } from 'react-router';

const MainNav = () => {
    const links = [
        {pathname: '/', title: 'Home', exact: true},
        {pathname: '/courses', title: 'Courses'},
        {pathname: '/students', title: 'Students'},
        {pathname: '/authenticate', title: 'Authenticate'},
    ];
    return (
        <nav>
            <ul>
                {links.map(link => {
                    return (
                        <li>
                            <Link
                                to={link.pathname}
                                activeOnlyWhenExact={link.exact}
                                activeClassName="active">
                                {link.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MainNav;