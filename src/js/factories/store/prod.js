import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { root } from '../../reducers';

const StoreFactory = () => {
    return createStore(root, applyMiddleware(thunk));
};

export default StoreFactory;