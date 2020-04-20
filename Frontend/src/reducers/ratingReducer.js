import {GET_INFLUENCER_RATINGS, GET_SPONSOR_RATINGS} from "../actions/types";

const initialState = {
    influencerRatings : {},
    sponsorRatings : {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_INFLUENCER_RATINGS:
            return {
                ...state,
                influencerRatings: action.payload.message,
            };

        case GET_SPONSOR_RATINGS:
            return {
                ...state,
                sponsorRatings: action.payload.message,
            };

        default:
            return state;
    }
}
