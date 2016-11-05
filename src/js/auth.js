import { push } from 'react-router-redux';

import store from './store';

const requireAuth = () => {
    store.dispatch(push('/authenticate'));
};

export { requireAuth };