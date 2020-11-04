const TOAST_TIMEOUT = 3000;

export const SET_MESSAGE = 'SET_MESSAGE';

const setMessage = (msg) => ({
    type: SET_MESSAGE,
    msg: msg
});

export function showToast(msg) {
    return (dispatch) => {
        dispatch(setMessage(msg));
        setTimeout(() => dispatch(setMessage('')), TOAST_TIMEOUT);
    };
}
