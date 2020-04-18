import axios from "axios";
import {SAVE_PROFILE, GET_PROFILE, ROOT_URL} from "./types";

export const getProfile = email => async dispatch => {
    try {
        const res = await axios.get(`${ROOT_URL}/users/profile?email=${email}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (e) {
        return {
            type: GET_PROFILE,
            payload: e
        };
    }
};

export const saveProfile = (data, email) => async dispatch => {
    try {
        const res = await axios.post(`${ROOT_URL}/saveprofile/${email}`, data);
        dispatch({
            type: SAVE_PROFILE,
            payload: res.data
        });
    } catch (e) {
        return {
            type: SAVE_PROFILE,
            payload: e
        };
    }
};