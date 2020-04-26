import { LOGIN_USER, REGISTER_USER } from "../actions/types";

const initialState = [];

export function landingPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
}
