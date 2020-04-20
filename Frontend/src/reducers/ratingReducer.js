import {
    GET_INFLUENCER_RATINGS,
    GET_SPONSOR_RATINGS,
    SORT_RATINGS_LOW_TO_HIGH,
    SORT_RATINGS_HIGH_TO_LOW
} from "../actions/types";

const initialState = {
    influencerRatings: {},
    sponsorRatings: {}
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

        case SORT_RATINGS_LOW_TO_HIGH:
            const lowToHighData = action.payload.sort((a, b) => (a.rating > b.rating) ? 1 : -1)
            console.log("reducer= " + JSON.stringify(lowToHighData))

            return {
                ...state,
                sponsorRatings: lowToHighData,
            };

        case SORT_RATINGS_HIGH_TO_LOW:
            const highToLowData = action.payload.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
            console.log("reducer= " + JSON.stringify(highToLowData))

            return {
                ...state,
                sponsorRatings: highToLowData,
            };

        default:
            return state;
    }
}
