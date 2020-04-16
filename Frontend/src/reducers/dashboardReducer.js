import {
    DASHBOARD_TASKS,
    DASHBOARD_CURRENT_PAGE_TASKS
} from '../actions/types';

const initialState = []

export function dashboardTasksReducer(state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_TASKS:
            if (action.payload === undefined)
                return state
            return action.payload.data.message.sort(function (a, b) { return a.postedOn - b.postedOn });
        default:
            return state;
    }
}

export function dashboardNumPageReducer(state = 0, action) {
    switch (action.type) {
        case DASHBOARD_TASKS:
            if (action.payload === undefined)
                return state
            return action.payload.data.message.length
        default:
            return state;
    }
}

export function dashboardCurrentPageTasksReducer(state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_TASKS:
            if (action.payload === undefined)
                return state
            return action.payload.data.message.slice(0, 12)
        case DASHBOARD_CURRENT_PAGE_TASKS:
            return action.payload
        default:
            return state;
    }
}