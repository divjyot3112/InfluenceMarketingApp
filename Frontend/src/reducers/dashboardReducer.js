import {
    DASHBOARD_TASKS,
    DASHBOARD_CURRENT_PAGE_TASKS,
    SORT_INCOME_LOW_TO_HIGH,
    SORT_INCOME_HIGH_TO_LOW,
    MOST_RECENT_TASKS,
    UNRATED_INFLUENCERS
} from '../actions/types';

const initialState = []

export function dashboardTasksReducer(state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_TASKS:
            if (action.payload === undefined)
                return state
            return action.payload.data.message.sort(function (a, b) { return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime() });
        case SORT_INCOME_LOW_TO_HIGH:
            return state.sort(function (a, b) { return a.salary - b.salary });
        case SORT_INCOME_HIGH_TO_LOW:
            return state.sort(function (a, b) { return b.salary - a.salary });
        case MOST_RECENT_TASKS:
            return state.sort(function (a, b) { return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime() });
        default:
            return state;
    }
}

export function dashboardNumPageReducer(state = 0, action) {
    switch (action.type) {
        case DASHBOARD_TASKS:
            if (action.payload === undefined)
                return state
            return Math.ceil(action.payload.data.message.length/12)
        default:
            return state;
    }
}

export function dashboardCurrentPageTasksReducer(state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_CURRENT_PAGE_TASKS:
            return action.payload
        default:
            return state;
    }
}

export function unratedInfluencersReducer(state = [], action) {
    switch (action.type) {
        case UNRATED_INFLUENCERS:
            return action.payload.data.message
        default:
            return state;
    }
}