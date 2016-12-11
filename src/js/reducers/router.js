import history from '../history';
import { NAVIGATE } from '../actions/types/router';

const router = (
    state = {
        location: history.location,
        action: history.action
    },
    action
) => {
    switch (action.type) {
        case NAVIGATE:
            return {
                location: action.location,
                action: action.action
            };
        default:
            return state;
    }
};

export default router;