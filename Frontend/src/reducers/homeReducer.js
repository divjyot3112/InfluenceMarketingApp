import { INPROGRESS_TASKS, PENDING_TASKS } from "../actions/types";

const initialState = {
  saved: false,

  pendingtasks: {},
  inprogresstasks: {},
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case PENDING_TASKS:
      return {
        ...state,
        pendingtasks: action.payload.message,
      };
    case INPROGRESS_TASKS:
      return {
        ...state,
        inprogresstasks: action.payload.message,
      };

    default:
      return state;
  }
}
