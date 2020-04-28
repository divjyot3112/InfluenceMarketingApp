import axios from "axios";
import { REGISTER_USER, LOGIN_USER, ROOT_URL } from "./types";

//SIGNUP ACTION
export const RegisterUser = (data) => (dispatch) => {
  console.log("Inside Register user action");

  axios.defaults.withCredentials = true;

  axios.post(`${ROOT_URL}/users/signup`, data).then((response) => {
    //Signup Action dispatched
    console.log("Inside sign up action Response", response);
    dispatch({
      type: REGISTER_USER,
      payload: response.data,
    });
  });
};

//LOGIN ACTION
export const LoginUser = (data) => (dispatch) => {
  console.log("Inside Login action");

  axios.defaults.withCredentials = true;

  axios.post(`${ROOT_URL}/users/login`, data).then((response) => {
    //Login Action dispatched
    console.log("Inside login action Response", response);
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
  });
};

// import axios from "axios";
// import { LOGIN_USER, REGISTER_USER } from "./types";

// export const loginUser = (data) => (dispatch) => {
//   axios.defaults.withCredentials = true;
//   axios.post("/api/users/login", data).then((res) => {
//     if (res.status === 200) {
//       localStorage.setItem("email", res.data.email);
//       console.log(res.status);
//       dispatch({
//         type: LOGIN_USER,
//         payload: res.data,
//       });
//     }
//   });
// };
