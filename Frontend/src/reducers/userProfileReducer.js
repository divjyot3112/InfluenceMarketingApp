import {SAVE_PROFILE, GET_PROFILE} from "../actions/types";

const initialState = {
    profile: {},
    updateStatus: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            // console.log("reducer= " + JSON.stringify(action.payload.message))
            return {
                ...state,
                profile: action.payload.message
            };

        case SAVE_PROFILE:
            console.log("payload = ", action.payload);
            return {
                ...state,
                updateStatus: action.payload
            };

        default:
            return state;
    }
}
