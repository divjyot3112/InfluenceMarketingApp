import axios from "axios";
import {SAVE_TASK, ROOT_URL} from "./types";

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
