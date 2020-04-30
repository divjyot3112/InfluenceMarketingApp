import axios from "axios";
import {REGISTER_USER, LOGIN_USER, ROOT_URL, SAVE_PROFILE} from "./types";

export const RegisterUser = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${ROOT_URL}/users/signup`, data);
        dispatch({
            type: REGISTER_USER,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: REGISTER_USER,
            payload: e,
        };
    }
};

export const LoginUser = (data) => async (dispatch) => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(
            `${ROOT_URL}/users/login`,
            data
        );
        dispatch({
            type: LOGIN_USER,
            payload: res.data,
        });
    } catch (e) {
        return {
            type: LOGIN_USER,
            payload: e,
        };
    }
};
