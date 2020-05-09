import axios from "axios";
import {
  INFLUENCER_EARNINGS_BY_CATEGORY,
  INFLUENCER_TASKS_COMPLETED_BY_CATEGORY,
  INFLUENCER_RATINGS_BY_CATEGORY,
  SPONSOR_PAYMENT_BY_CATEGORY,
  SPONSOR_ALL_TASKS_BY_CATEGORY,
  SPONSOR_COMPLETED_TASKS_BY_CATEGORY,
  ROOT_URL,
} from "./types";

export const getInfluencerRatingsByCategory = (email) => async (dispatch) => {
  console.log(
    "Inside analyticsActions getInfluencerRatingsByCategory email:   ",
    email
  );

  try {
    const res = await axios.get(`${ROOT_URL}/influencers/ratings/category`, {
      params: { email: email },
    });
    dispatch({
      type: INFLUENCER_RATINGS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: INFLUENCER_RATINGS_BY_CATEGORY,
      payload: e,
    };
  }
};

export const getInfluencerTasksCountByCategory = (email) => async (
  dispatch
) => {
  console.log(
    "Inside analyticsActions getInfluencerTasksCountByCategory email:   ",
    email
  );

  try {
    const res = await axios.get(`${ROOT_URL}/influencers/selected/category`, {
      params: { email: email },
    });
    dispatch({
      type: INFLUENCER_TASKS_COMPLETED_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: INFLUENCER_TASKS_COMPLETED_BY_CATEGORY,
      payload: e,
    };
  }
};

export const getInfluencerEarningsbyCategory = (email) => async (dispatch) => {
  console.log(
    "Inside analyticsActions getInfluencerEarningsbyCategory email:   ",
    email
  );

  try {
    const res = await axios.get(`${ROOT_URL}/influencers/earnings/category`, {
      params: { email: email },
    });
    dispatch({
      type: INFLUENCER_EARNINGS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: INFLUENCER_EARNINGS_BY_CATEGORY,
      payload: e,
    };
  }
};

export const getSponsorPaymentbyCategory = (email) => async (dispatch) => {
  console.log(
    "Inside analyticsActions getSponsorPaymentbyCategory email:   ",
    email
  );

  try {
    const res = await axios.get(`${ROOT_URL}/sponsors/payment/category`, {
      params: { email: email },
    });
    dispatch({
      type: SPONSOR_PAYMENT_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: SPONSOR_PAYMENT_BY_CATEGORY,
      payload: e,
    };
  }
};

export const getSponsorAllTasksbyCategory = (email) => async (dispatch) => {
  console.log(
    "Inside analyticsActions getSponsorAllTasksbyCategory email:   ",
    email
  );

  try {
    const res = await axios.get(`${ROOT_URL}/sponsors/tasks/category`, {
      params: { email: email },
    });
    dispatch({
      type: SPONSOR_ALL_TASKS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: SPONSOR_ALL_TASKS_BY_CATEGORY,
      payload: e,
    };
  }
};

export const getSponsorCompletedTasksbyCategory = (email) => async (
  dispatch
) => {
  console.log(
    "Inside analyticsActions getSponsorCompletedTasksbyCategory email:   ",
    email
  );

  try {
    const res = await axios.get(`${ROOT_URL}/sponsors/completed/category`, {
      params: { email: email },
    });
    dispatch({
      type: SPONSOR_COMPLETED_TASKS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    return {
      type: SPONSOR_COMPLETED_TASKS_BY_CATEGORY,
      payload: e,
    };
  }
};
