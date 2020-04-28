import { LOGIN_USER, REGISTER_USER } from "../actions/types";

const initialState = {
  role: "",
  signedIn: false,
  loading: false,
  redirect: false,
};

export function landingPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        role: action.payload,
      };

    case REGISTER_USER:
      return {
        ...state,
        redirect: action.payload,
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
