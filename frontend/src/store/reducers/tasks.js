const reducers = {
    TASK_VALIDATION_ERROR: (state, action) => {
        return Object.assign({}, state, {
            errorMsg: action.errorMsg
        });
    },

    FETCH_TASKS_REQUEST: (state) => {
        return Object.assign({}, state, {
            fetching: true,
            errorMsg: ''
        });
    },

    FETCH_TASKS_SUCCESS: (state, action) => {
        return Object.assign({}, state, {
            tasks: action.items,
            totalTasks: action.totalItems,
            fetching: false
        });
    },

    FETCH_TASKS_ERROR: (state) => {
        return Object.assign({}, state, {
            fetching: false
        });
    },

    SET_TASK_STATE: (state, action) => {
        const tasks = [...state.tasks];
        const index = tasks.findIndex(t => t.id === action.task.id);
        if (index >= 0) {
            tasks[index] = { ...action.task, state: action.state };
        }
        return Object.assign({}, state, {
            tasks: tasks
        });
    },

    CHANGE_PAGE: (state, action) => {
        return Object.assign({}, state, {
            page: action.page
        });
    },
};

const initState = {
    fetching: false,
    saving: false,
    errorMsg: '',
    tasks: [],
    totalTasks: 0,
    page: 1
};

export default function taskReducer(state = initState, action) {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
