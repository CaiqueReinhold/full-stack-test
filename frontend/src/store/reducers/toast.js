import { SET_MESSAGE } from '../actions/toast';

export default function reducer(state = '', action) {
    if (action.type === SET_MESSAGE) {
        return action.msg;
    }
    return state;
}
