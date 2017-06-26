import React from 'react';

import { Feature } from '../containers';
import TermList from '../terms/term-list'

const TermListController = () => {
    return (
        <Feature title="Terms">
            <TermList />
        </Feature>
    );
};

export default TermListController;