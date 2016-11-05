import { browserHistory } from 'react-router';

const requireAuth = () => {
    browserHistory.push('/authenticate');
};

export { requireAuth };