import {
  INPROGRESS_TASKS,
  PENDING_TASKS,
  RECENTLY_POSTED_TASKS,
  RECOMMENDED_TASKS,
  MY_ACTIVE_TASKS,
} from "../actions/types";

const initialState = {
  saved: false,

  pendingtasks: {},
  inprogresstasks: {},
  recentlypostedtasks: {},
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case PENDING_TASKS:
      console.log("Inside pending tasks reducer");
      return {
        ...state,
        pendingtasks: action.payload.message,
      };
    case INPROGRESS_TASKS:
      console.log("Inside in progress tasks reducer");

      return {
        ...state,
        inprogresstasks: action.payload.message,
      };

    case RECENTLY_POSTED_TASKS:
      console.log(
        "Inside getRecentlyPostedTasks reducer data:",
        action.payload.message
      );
      return {
        ...state,
        recentlypostedtasks: action.payload.message,
      };

    default:
      return state;
  }
}
