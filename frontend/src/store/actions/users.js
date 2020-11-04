import axios from 'axios';

import { config } from '../../Constants';
import history from '../../history';
import routes from '../../routes';

import { showToast } from './toast';

export const USER_VALIDATION_ERROR = 'USER_VALIDATION_ERROR';

export const userValidationError = (errorMsg) => ({
    type: USER_VALIDATION_ERROR,
    errorMsg: errorMsg
});

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST
});

const fetchUsersSucess = (items, total) => ({
    type: FETCH_USERS_SUCCESS,
    items: items,
    total: total
});

const fetchUsersError = () => ({
    type: FETCH_USERS_ERROR
});

export function fetchUsers() {
    return (dispatch, getState) => {
        const page = getState().users.page;
        dispatch(fetchUsersRequest());
        axios.get(`${config.USERS_DOMAIN}/users?page=${page}`).then((response) => {
            dispatch(fetchUsersSucess(response.data.items, response.data.total));
        }).catch((error) => {
            if (error.response) {
                dispatch(showToast('Unexpected server error.'));
                dispatch(fetchUsersError());
            } else {
                dispatch(showToast('Unexpected network error.'))
                dispatch(fetchUsersError());
            }
        });
    };
}

export const CHANGE_PAGE = 'CHANGE_PAGE';

const changePage = (page) => ({
    type: CHANGE_PAGE,
    page: page
});

export function nextPage() {
    return (dispatch, getState) => {
        const page = getState().users.page;
        dispatch(changePage(page + 1));
        dispatch(fetchUsers());
    };
}

export function previousPage() {
    return (dispatch, getState) => {
        const page = getState().users.page;
        dispatch(changePage(page - 1));
        dispatch(fetchUsers());
    };
}

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
});

const createUserSuccess = () => ({
    type: CREATE_USER_SUCCESS
});

const createUserError = (errorMsg) => ({
    type: CREATE_USER_ERROR,
    errorMsg: errorMsg
});

export function createUser(name) {
    return (dispatch) => {
        dispatch(createUserRequest());
        axios.post(`${config.USERS_DOMAIN}/user`, { name }).then((response) => {
            dispatch(createUserSuccess(response.data));
            dispatch(fetchUsers());
            history.push(routes.users);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    dispatch(createUserError(error.response.data.detail));
                } else {
                    dispatch(showToast('Unexpected server error.'))
                    dispatch(createUserError());
                }
            } else {
                dispatch(showToast('Unexpected network error.'));
                dispatch(createUserError());
            }
        });
    };
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UDPATE_USER_ERROR = 'UDPATE_USER_ERROR';

const updateUserRequest = () => ({
    type: UPDATE_USER_REQUEST
});

const updateUserSuccess = () => ({
    type: UPDATE_USER_SUCCESS
});

const updateUserError = (errorMsg) => ({
    type: UDPATE_USER_ERROR,
    errorMsg: errorMsg
});

export function updateUser(user, name) {
    return (dispatch) => {
        dispatch(updateUserRequest());
        axios.put(`${config.USERS_DOMAIN}/user/${user.id}`, {
            name: name
        }).then(() => {
            dispatch(updateUserSuccess());
            dispatch(fetchUsers());
            history.push(routes.users);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    dispatch(updateUserError(error.response.data.detail));
                } else {
                    dispatch(showToast('Unexpected server error.'))
                    dispatch(updateUserError());
                }
            } else {
                dispatch(showToast('Unexpected network error.'));
                dispatch(updateUserError());
            }
        });
    };
}

export function deleteUser(user) {
    return (dispatch) => {
        axios.delete(`${config.USERS_DOMAIN}/user/${user.id}`).then(() => {
            dispatch(fetchUsers());
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    dispatch(showToast('User has already been deleted, refresh the page.'));
                } else {
                    dispatch(showToast('Unexpected server error.'));
                }
            } else {
                dispatch(showToast('Unexpected network error.'));
            }
        });
    };
}

export const SELECT_USER = 'SELECT_USER';

export const selectUser = (user) => ({
    type: SELECT_USER,
    user: user
});

export function getUser(userId) {
    return (dispatch) => {
        axios.get(`${config.USERS_DOMAIN}/user/${userId}`).then((response) => {
            dispatch(selectUser(response.data));
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    dispatch(showToast('User does not exist.'));
                } else {
                    dispatch(showToast('Unexpected server error.'));
                }
            } else {
                dispatch(showToast('Unexpected network error.'));
            }
        });
    };
}
