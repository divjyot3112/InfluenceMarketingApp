import {SAVE_PROFILE, GET_PROFILE} from "../actions/types";

const initialState = {
    profile: {},
    updated: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };

        case SAVE_PROFILE:
            return {
                ...state,
                updated: true,
            };

        default:
            return state;
    }
}
