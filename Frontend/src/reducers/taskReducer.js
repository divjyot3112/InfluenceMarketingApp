import {SAVE_TASK, EDIT_TASK, GET_TASK, SELECTED_CANDIDATES} from "../actions/types";

const initialState = {
    saved: false,
    edited: false,
    selected: false,
    task: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SAVE_TASK:
            return {
                ...state,
                saved: true,
            };
        case EDIT_TASK:
            console.log("Inside task reducer")
            return {
                ...state,
                edited: true,
            };
        case SELECTED_CANDIDATES:
            console.log("Inside selected candidates reducer")
            return {
                ...state,
                selected: true,
            }
        case GET_TASK:
            return {
                ...state,
                task: action.payload.message,
            };
        default:
            return state;
    }
}
