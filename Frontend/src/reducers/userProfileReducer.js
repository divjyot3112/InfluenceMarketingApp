import {SAVE_PROFILE, GET_PROFILE, DEACTIVATE_PROFILE} from "../actions/types";

const initialState = {
    profile: {},
    updated: false,
    deactivateProfile: {}
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

        case DEACTIVATE_PROFILE:
            return {
                ...state,
                deactivateProfile: action.payload,
            };

        default:
            return state;
    }
}
