import { combineReducers } from 'redux';

import users from './users';
import tasks from './tasks';
import toast from './toast';

const rootReducer = combineReducers({
    users,
    tasks,
    toast
});

export default rootReducer;
