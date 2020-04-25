import axios from "axios";
import { REGISTER_USER, LOGIN_USER, ROOT_URL } from "./types";

//SIGNUP ACTION
export const RegisterUser = (data) => (dispatch) => {
  console.log("Register action");

  axios.defaults.withCredentials = true;

  axios.post(`${ROOT_URL}/signup`, data).then((response) => {
    //SIGNUP Action dispatched
    console.log("Inside sign up action Response", response);
    dispatch({
      type: REGISTER_USER,
      payload: response,
    });
  });
};

//LOGIN ACTION
export const LoginUser = (data) => (dispatch) => {
  console.log("Login action");

  axios.defaults.withCredentials = true;

  axios.post(`${ROOT_URL}/login`, data).then((response) => {
    //Login Action dispatched
    console.log("Inside login action Response", response);
    dispatch({
      type: LOGIN_USER,
      payload: response,
    });
  });
};
