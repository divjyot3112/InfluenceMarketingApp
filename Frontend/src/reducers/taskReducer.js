import {SAVE_TASK, GET_TASK} from "../actions/types";

const initialState = {
    saved: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SAVE_TASK:
            return {
                ...state,
                saved: true,
            };
        case GET_TASK:
            return {
                ...state,
                task: action.payload.message,
            };
        default:
            return state;
    }
}
