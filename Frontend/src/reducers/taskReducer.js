import {SAVE_TASK} from "../actions/types";

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

        default:
            return state;
    }
}
