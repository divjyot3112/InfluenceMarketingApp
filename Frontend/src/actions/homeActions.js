import axios from "axios";
import { INPROGRESS_TASKS, PENDING_TASKS, ROOT_URL } from "./types";

export const getSponsorPendingTasks = (email, status) => async (dispatch) => {
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
