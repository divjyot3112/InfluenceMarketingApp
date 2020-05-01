import axios from "axios";
import {
    ROOT_URL,
    SAVE_TASK,
    GET_TASK,
    EDIT_TASK,
    APPLY_TASK,
    SELECTED_CANDIDATES,
    GET_SELECTED_CANDIDATES,
    DELETE_TASK,
    GET_SPONSOR_PROFILE,
    MARK_COMPLETE
} from "./types";

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

export const apply = (taskId, data) => async (dispatch) => {
    try {
        const res = await axios.put(`${ROOT_URL}/tasks/${taskId}/apply`, data);
        dispatch({
            type: APPLY_TASK,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: APPLY_TASK,
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

export const markAsComplete = (taskId, data) => async (dispatch) => {
    // console.log("Actions " + taskId + data)
    try {
        const res = await axios.put(`${ROOT_URL}/tasks/complete/${taskId}`, data);
        dispatch({
            type: MARK_COMPLETE,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: MARK_COMPLETE,
            payload: e,
        };
    }
};

export const getSelectedCandidateProfiles = (taskId) => async (dispatch) => {
    console.log("Get Selected candidate profiles " + taskId)
    try {
        const res = await axios.get(`${ROOT_URL}/tasks/${taskId}/selected`);
        dispatch({
            type: GET_SELECTED_CANDIDATES,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: GET_SELECTED_CANDIDATES,
            payload: e,
        };
    }
};

export const getSponsorProfile = (email) => async (dispatch) => {
    console.log("getting sponsor profile")
    try {
        const res = await axios.get(
            `${ROOT_URL}/users/profile?email=${email}`
        );
        dispatch({
            type: GET_SPONSOR_PROFILE,
            payload: res,
        });
    } catch (e) {
        return {
            type: GET_SPONSOR_PROFILE,
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

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        console.log("Actions"+taskId)
        const res = await axios.put(`${ROOT_URL}/tasks/delete/${taskId}`);
        dispatch({
            type: DELETE_TASK,
            payload: res,
        });
    } catch (e) {
        return {
            type: DELETE_TASK,
            payload: e,
        };
    }
};
