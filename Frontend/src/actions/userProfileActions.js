import axios from "axios";
import {SAVE_PROFILE, GET_PROFILE, ROOT_URL, DEACTIVATE_PROFILE} from "./types";

export const getProfile = email => async (dispatch) => {
    try {
        const res = await axios.get(
            `${ROOT_URL}/users/profile?email=${email}`
        );
        dispatch({
            type: GET_PROFILE,
            payload: res,
        });
    } catch (e) {
        return {
            type: GET_PROFILE,
            payload: e,
        };
    }
};

export const saveProfile = (data, email) => async (dispatch) => {
    try {
        const res = await axios.put(
            `${ROOT_URL}/users/profile?email=${email}`,
            data
        );
        dispatch({
            type: SAVE_PROFILE,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: SAVE_PROFILE,
            payload: e,
        };
    }
};

export const deactivateProfile = (data, email) => async (dispatch) => {
    try {
        const res = await axios.patch(
            `${ROOT_URL}/users/profile/deactivate?email=${email}`, data
        );
        dispatch({
            type: DEACTIVATE_PROFILE,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: DEACTIVATE_PROFILE,
            payload: e,
        };
    }
};
