import axios from "axios";
import { SAVE_TASK, GET_TASK, GET_ALL_TASKS, ROOT_URL } from "./types";

export const saveTask = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${ROOT_URL}/tasks/create`, data);
    dispatch({
      type: SAVE_TASK,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: SAVE_TASK,
      payload: e,
    };
  }
};

export const getTask = (data) => async (dispatch) => {
  try {
    console.log("Actions" + data.taskId);
    const res = await axios.get(`${ROOT_URL}/tasks/${data.taskId}`);
    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: GET_TASK,
      payload: e,
    };
  }
};

export const getAllTasks = () => async (dispatch) => {
  console.log("Inside getallTasks action creator");
  try {
    const res = await axios.get(`${ROOT_URL}/tasks`);
    dispatch({
      type: GET_ALL_TASKS,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: GET_ALL_TASKS,
      payload: e,
    };
  }
};
