import {
    GET_INFLUENCER_RATINGS,
    GET_SPONSOR_RATINGS,
    SORT_RATINGS_LOW_TO_HIGH,
    SORT_RATINGS_HIGH_TO_LOW
} from "../actions/types";

const initialState = {
    ratings: {},
    averageRating: ""
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_INFLUENCER_RATINGS:
            var ratings = []
            for (var i = 0; i < action.payload.message.length; i++)
                ratings.push(action.payload.message[i].rating)

            const average = ratings.reduce((a, b) => (a + b)) / ratings.length;
            const result = average.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0]

            return {
                ...state,
                ratings: action.payload.message,
                averageRating: result
            };

        case GET_SPONSOR_RATINGS:
            return {
                ...state,
                ratings: action.payload.message,
            };

        case SORT_RATINGS_LOW_TO_HIGH:
            const lowToHighData = action.payload.sort((a, b) => (a.rating > b.rating) ? 1 : -1)

            return {
                ...state,
                ratings: lowToHighData,
            };

        case SORT_RATINGS_HIGH_TO_LOW:
            const highToLowData = action.payload.sort((a, b) => (a.rating < b.rating) ? 1 : -1)

            return {
                ...state,
                ratings: highToLowData,
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
