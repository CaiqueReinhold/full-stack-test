const reducers = {
    USER_VALIDATION_ERROR: (state, action) => {
        return Object.assign({}, state, {
            errorMsg: action.errorMsg
        });
    },

    CREATE_USER_REQUEST: (state) => {
        return Object.assign({}, state, {
            saving: true,
            errorMsg: ''
        });
    },

    CREATE_USER_SUCCESS: (state) => {
        return Object.assign({}, state, {
            saving: false,
            page: 1
        });
    },

    CREATE_USER_ERROR: (state) => {
        return Object.assign({}, state, {
            saving: false
        });
    },

    UPDATE_USER_REQUEST: (state) => {
        return Object.assign({}, state, {
            saving: true,
            errorMsg: ''
        });
    },

    UPDATE_USER_SUCCESS: (state) => {
        return Object.assign({}, state, {
            saving: false,
            page: 1
        });
    },

    UPDATE_USER_ERROR: (state) => {
        return Object.assign({}, state, {
            saving: false
        });
    },

    FETCH_USERS_REQUEST: (state) => {
        return Object.assign({}, state, {
            fetching: true
        });
    },

    FETCH_USERS_SUCCESS: (state, action) => {
        return Object.assign({}, state, {
            fetching: false,
            users: action.items,
            totalUsers: action.total
        });
    },

    FETCH_USERS_ERROR: (state) => {
        return Object.assign({}, state, {
            fetching: false
        });
    },

    CHANGE_PAGE: (state, action) => {
        return Object.assign({}, state, {
            page: action.page
        });
    },

    SELECT_USER: (state, action) => {
        return Object.assign({}, state, {
            selectedUser: action.user
        });
    }
};

const initState = {
    fetching: false,
    saving: false,
    errorMsg: '',
    users: [],
    totalUsers: 0,
    page: 1,
    selectedUser: null
};

export default function userReducer(state = initState, action) {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
