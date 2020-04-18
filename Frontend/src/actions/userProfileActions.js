import axios from "axios";
import {SAVE_PROFILE, GET_PROFILE, ROOT_URL} from "./types";

export function getProfile(email, callback) {
    try {
        const request = axios
            .get(`${ROOT_URL}/users/profile?email=${email}`)
            .then((res) => callback(res));

        return {
            type: GET_PROFILE,
            payload: request,
        };
    } catch (e) {
        return {
            type: GET_PROFILE,
            payload: e,
        };
    }
}

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
