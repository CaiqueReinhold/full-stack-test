import axios from 'axios';

import routes from '../../routes';
import history from '../../history';
import { config } from '../../Constants';
import { showToast } from './toast';

export const TASK_VALIDATION_ERROR = 'TASK_VALIDATION_ERROR';

export const taskValidationError = (errorMsg) => ({
    type: TASK_VALIDATION_ERROR,
    errorMsg: errorMsg
});

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';

const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST
});

const fetchTasksSuccess = (items, totalItems) => ({
    type: FETCH_TASKS_SUCCESS,
    items: items,
    totalItems: totalItems
});

const fetchTasksError = () => ({
    type: FETCH_TASKS_ERROR
});

export function fetchTasks(userId) {
    return (dispatch, getState) => {
        const page = getState().users.page;
        dispatch(fetchTasksRequest());
        axios.get(`${config.TASKS_DOMAIN}/user/${userId}/tasks?page=${page}`).then((response) => {
            dispatch(fetchTasksSuccess(response.data.items, response.data.total));
        }).catch((error) => {
            if (error.response) {
                dispatch(showToast('Unexpected server error.'));
                dispatch(fetchTasksError());
            } else {
                dispatch(showToast('Unexpected network error.'))
                dispatch(fetchTasksError());
            }
        });
    };
}

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR';

const createTaskRequest = () => ({
    type: CREATE_TASK_REQUEST
});

const createTaskSuccess = (task) => ({
    type: CREATE_TASK_SUCCESS,
    task: task
});

const createTaskError = (errorMsg) => ({
    type: CREATE_TASK_ERROR,
    errorMsg: errorMsg
});

export function createTask(userId, description) {
    return (dispatch) => {
        dispatch(createTaskRequest());
        axios.post(`${config.TASKS_DOMAIN}/task`, {
            description: description,
            user_id: userId
        }).then((response) => {
            dispatch(createTaskSuccess(response.data));
            dispatch(fetchTasks(userId));
            history.push(routes.tasks.replace(':userId', userId));
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    dispatch(createTaskError(error.response.data.detail));
                } else {
                    dispatch(showToast('Unexpected server error.'));
                    dispatch(createTaskError());
                }
            } else {
                dispatch(showToast('Unexpected network error.'));
                dispatch(createTaskError());
            }
        });
    };
}

export const SET_TASK_STATE = 'SET_TASK_STATE';

const setTaskState = (task, state) => ({
    type: SET_TASK_STATE,
    state: state,
    task: task
});

export function updateTaskState(task, state) {
    return (dispatch) => {
        axios.put(`${config.TASKS_DOMAIN}/task/${task.id}`, { state }).then(() => {
            dispatch(setTaskState(task, state));
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    dispatch(showToast('Task not found, refresh the page.'));
                } else {
                    dispatch(showToast('Unexpected server error.'));
                }
            } else {
                dispatch(showToast('Unexpected network error.'));
            }
        });
    };
}

export function deleteTask(task) {
    return (dispatch) => {
        axios.delete(`${config.TASKS_DOMAIN}/task/${task.id}`).then(() => {
            dispatch(fetchTasks(task.user_id));
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    dispatch(showToast('Task not found, refresh the page.'));
                } else {
                    dispatch(showToast('Unexpected server error.'));
                }
            } else {
                dispatch(showToast('Unexpected network error.'));
            }
        });
    }
}

export const CHANGE_PAGE = 'CHANGE_PAGE';

const changePage = (page) => ({
    type: CHANGE_PAGE,
    page: page
});

export function nextPage() {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(changePage(state.tasks.page + 1));
        dispatch(fetchTasks(state.users.selectedUser.id));
    };
}

export function previousPage() {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(changePage(state.tasks.page - 1));
        dispatch(fetchTasks(state.users.selectedUser.id));
    };
}
