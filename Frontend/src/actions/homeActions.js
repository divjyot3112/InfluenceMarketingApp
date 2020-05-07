import axios from "axios";
import {
  INPROGRESS_TASKS,
  PENDING_TASKS,
  RECENTLY_POSTED_TASKS,
  MY_ACTIVE_TASKS,
  RECOMMENDED_TASKS,
  ROOT_URL,
} from "./types";

//SPONSOR

export const getSponsorPendingTasks = (email, status) => async (dispatch) => {
  console.log("Inside homeActions get pending tasks email:   ", email);

  console.log("Inside homeActions get pending tasks status:   ", status);

  try {
    const res = await axios.get(`${ROOT_URL}/tasks/filter`, {
      params: { email: email, status: status },
    });
    dispatch({
      type: PENDING_TASKS,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: PENDING_TASKS,
      payload: e,
    };
  }
};

export const getSponsorInProgressTasks = (email, status) => async (
  dispatch
) => {
  console.log("Inside homeActions get in progress tasks email:   ", email);

  console.log("Inside homeActions get in progress tasks status:   ", status);
  try {
    const res = await axios.get(`${ROOT_URL}/tasks/filter`, {
      params: { email: email, status: status },
    });
    dispatch({
      type: INPROGRESS_TASKS,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: INPROGRESS_TASKS,
      payload: e,
    };
  }
};

//INFLUENCER

export const getRecentlyPostedTasks = () => async (dispatch) => {
  console.log("Inside homeActions getRecentlyPostedTasks");

  try {
    const res = await axios.get(`${ROOT_URL}/tasks`);
    dispatch({
      type: RECENTLY_POSTED_TASKS,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: RECENTLY_POSTED_TASKS,
      payload: e,
    };
  }
};
