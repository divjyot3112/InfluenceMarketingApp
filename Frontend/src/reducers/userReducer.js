import {LOGIN_USER, REGISTER_USER} from "../actions/types";

const initialState = {
    loginResponse: {},
    SignUpResponse: {},
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginResponse: action.payload,
            };

        case REGISTER_USER:
            return {
                ...state,
                SignUpResponse: action.payload,
            };
        default:
            return state;
    }
}