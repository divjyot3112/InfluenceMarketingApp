import { LOGIN_USER, REGISTER_USER } from "../actions/types";

const initialState = {
  JWTtoken: {},
  loginSuccess: false,
  SignUpSuccess: false,
  userDetails: {},
  loading: false,
};

export default function userReducer(state = initialState, action) {
  console.log("Inside user reducer");
  console.log("dasdasas", action);

  switch (action.type) {
    case LOGIN_USER:
      // console.log("Inside case LOGIN_USER");
      return {
        ...state,
        JWTtoken: action.payload.message,
        loginSuccess: true,
      };

    case REGISTER_USER:
      // console.log("Inside case REGISTER_USER");
      // console.log("action payload", action.payload.message);

      return {
        ...state,
        userDetails: action.payload.message,
        SignUpSuccess: true,
      };
    default:
      return state;
  }
}

// const initialState = {
//     user: '',
// }

// export default function(state = initialState, action) {
//     switch(action.type){
//         case LOGIN_USER:
//             return {
//                 ...state,
//                 user: action.payload,
//             };
//             default:
//             return state;
//     }
// }
