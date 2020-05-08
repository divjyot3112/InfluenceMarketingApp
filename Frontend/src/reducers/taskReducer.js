
import {
    SAVE_TASK,
    EDIT_TASK,
    GET_TASK,
    SELECTED_CANDIDATES,
    GET_SELECTED_CANDIDATES,
    DELETE_TASK,
    APPLY_TASK,
  GET_ALL_TASKS,
    GET_SPONSOR_PROFILE,
    MARK_COMPLETE
} from "../actions/types";

const initialState = {
    saved: false,
    edited: false,
    selected: false,
    deleted: false,
    applied: false,
    completed: false,
    sponsor:{},
    task: {},
    profiles: [],
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


        case SAVE_TASK:
            return {
                ...state,
                saved: true,
            };
        case APPLY_TASK:
            return {
                ...state,
                applied: true,
            };
        case MARK_COMPLETE:
            return {
                ...state,
                completed: true,
            };
        case DELETE_TASK:
            return {
                ...state,
                deleted: action.payload.status===200 ? true : false,
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
            };
        case GET_SELECTED_CANDIDATES:
            console.log("Inside selected candidates reducer")
            return {
                ...state,
                profiles: action.payload.message,
            };
        case GET_TASK:
            return {
                ...state,
                task: action.payload.message,
            };
  
    case GET_ALL_TASKS:
       return {
        ...state,
        tasks: action.payload.message,
      };
  
        case GET_SPONSOR_PROFILE:
            return {
                ...state,
                sponsor: action.payload.data.message
            }
        default:
            return state;
    }

}
