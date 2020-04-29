import axios from "axios";
import {SAVE_TASK, GET_TASK, EDIT_TASK, ROOT_URL, SELECTED_CANDIDATES} from "./types";

export const saveTask = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${ROOT_URL}/tasks/create`, data);
        dispatch({
            type: SAVE_TASK,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: SAVE_TASK,
            payload: e,
        };
    }
};

export const editTask = (taskId, data) => async (dispatch) => {
    try {
        const res = await axios.put(`${ROOT_URL}/tasks/edit/${taskId}`, data);
        dispatch({
            type: EDIT_TASK,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: EDIT_TASK,
            payload: e,
        };
    }
};

export const selectCandidates = (taskId, data) => async (dispatch) => {
    // console.log("Actions " + taskId + data)
    try {
        const res = await axios.put(`${ROOT_URL}/tasks/${taskId}/select`, data);
        dispatch({
            type: SELECTED_CANDIDATES,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: SELECTED_CANDIDATES,
            payload: e,
        };
    }
};

export const getTask = (data) => async (dispatch) => {
    try {
        console.log("Actions"+data.taskId)
        const res = await axios.get(`${ROOT_URL}/tasks/${data.taskId}`);
        dispatch({
            type: GET_TASK,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: GET_TASK,
            payload: e,
        };
    }
};
