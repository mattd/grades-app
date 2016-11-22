import history from '../history';
import { NAVIGATE } from '../actions/types/router';

const router = (
    state = {
        location: history.location,
        action: history.action
    },
    action
) => {
    if (action.type === NAVIGATE) {
        return {
            ...state,
            location: action.location,
            action: action.action
        }
    } else {
        return state
    }
};

export default router;