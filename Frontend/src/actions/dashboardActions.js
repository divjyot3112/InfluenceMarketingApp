import axios from 'axios';
import {
    DASHBOARD_TASKS,
    DASHBOARD_CURRENT_PAGE_TASKS,
    SORT_INCOME_LOW_TO_HIGH,
    SORT_INCOME_HIGH_TO_LOW,
    MOST_RECENT_TASKS,
    UNRATED_INFLUENCERS,
    ROOT_URL
} from './types';

export const fetchDashboardTasks = (email, status,nextFun) => dispatch => {
    console.log("Dashboard action")
    axios.defaults.withCredentials = true;
    axios.get(`${ROOT_URL}/tasks/filter`, { params: { email: email, status: status } })
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: DASHBOARD_TASKS,
                payload: response
            })
            nextFun()
        })
}


//for pagination
export const getCurrentPageTasks = (pageNum, allTasks) => dispatch => {
    dispatch({
        type: DASHBOARD_CURRENT_PAGE_TASKS,
        payload: allTasks.slice((pageNum - 1) * 12, pageNum * 12)
    })
}

//sorting
export const sortTasks = (sortBy,nextFun) => dispatch => {
    if (sortBy === 1) {
        dispatch({
            type: SORT_INCOME_LOW_TO_HIGH
        })
    }
    else if (sortBy === 2) {
        dispatch({
            type: SORT_INCOME_HIGH_TO_LOW
        })
    }
    else {
        dispatch({
            type: MOST_RECENT_TASKS
        })
    }
    nextFun()
}


//get unrated influencers for a task
export const fetchUnratedInfluencers = (taskId, nextFun) => dispatch => {
    console.log("Get Unrated Influencers action")
    axios.defaults.withCredentials = true;
    axios.get(`${ROOT_URL}/tasks/unrated`, { params: { taskId:taskId } })
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: UNRATED_INFLUENCERS,
                payload: response
            })
            nextFun()
        })
}