import {
  INFLUENCER_EARNINGS_BY_CATEGORY,
  INFLUENCER_TASKS_COMPLETED_BY_CATEGORY,
  INFLUENCER_RATINGS_BY_CATEGORY,
  SPONSOR_PAYMENT_BY_CATEGORY,
  SPONSOR_ALL_TASKS_BY_CATEGORY,
  SPONSOR_COMPLETED_TASKS_BY_CATEGORY,
} from "../actions/types";

const initialState = {
  influencer_earningsbycategory: {},
  influencer_tasksbycategory: {},
  influencer_ratingsbycategory: {},
  sponsor_paymentbycategory: {},
  sponsor_allTasksbycategory: {},
  sponsor_CompletedTasksbycategory: {},
};

export default function analyticsReducer(state = initialState, action) {
  switch (action.type) {
    case INFLUENCER_RATINGS_BY_CATEGORY:
      console.log(
        "Inside INFLUENCER_RATINGS_BY_CATEGORY data:",
        action.payload.message
      );
      return {
        ...state,
        influencer_ratingsbycategory: action.payload.message,
      };

    case INFLUENCER_TASKS_COMPLETED_BY_CATEGORY:
      console.log("Inside INFLUENCER_TASKS_COMPLETED_BY_CATEGORY reducer");

      return {
        ...state,
        influencer_tasksbycategory: action.payload.message,
      };

    case INFLUENCER_EARNINGS_BY_CATEGORY:
      console.log("Inside INFLUENCER_EARNINGS_BY_CATEGORY reducer");
      return {
        ...state,
        influencer_earningsbycategory: action.payload.message,
      };

    case SPONSOR_PAYMENT_BY_CATEGORY:
      console.log("Inside SPONSOR_PAYMENT_BY_CATEGORY reducer");
      return {
        ...state,
        sponsor_paymentbycategory: action.payload.message,
      };

    case SPONSOR_ALL_TASKS_BY_CATEGORY:
      console.log("Inside SPONSOR_ALL_TASKS_BY_CATEGORY reducer");
      return {
        ...state,
        sponsor_allTasksbycategory: action.payload.message,
      };

    case SPONSOR_COMPLETED_TASKS_BY_CATEGORY:
      console.log("Inside SPONSOR_COMPLETED_TASKS_BY_CATEGORY reducer");
      return {
        ...state,
        sponsor_CompletedTasksbycategory: action.payload.message,
      };

    default:
      return state;
  }
}
