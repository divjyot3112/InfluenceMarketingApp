import {
    DASHBOARD_TASKS,
} from '../actions/types';

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_TASKS:
            if (action.payload === undefined)
                return state
            return action.payload.data.message.sort(function (a, b) { return a.postedOn - b.postedOn });
        default:
            return state;
    }
}