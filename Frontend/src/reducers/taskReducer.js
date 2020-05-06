import { SAVE_TASK, GET_TASK, GET_ALL_TASKS } from "../actions/types";

const initialState = {
  saved: false,
  task: {},
  tasks: {},
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
    case GET_ALL_TASKS:
      console.log(
        "Inside getallTasks reducer task data:",
        action.payload.message
      );

      return {
        ...state,
        tasks: action.payload.message,
      };
    default:
      return state;
  }
}
