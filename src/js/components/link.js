import React from 'react';

const Link = ({
    onClick,
    children
}) => {
    return (
        <a href="#"
           onClick={e => {
               e.preventDefault();
               onClick();
           }}
        >
            {children}
        </a>
    );
};

export default Link;