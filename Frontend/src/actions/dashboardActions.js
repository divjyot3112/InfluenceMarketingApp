import axios from 'axios';
import {
    DASHBOARD_TASKS,
    DASHBOARD_CURRENT_PAGE_TASKS,
    SORT_INCOME_LOW_TO_HIGH,
    SORT_INCOME_HIGH_TO_LOW,
    MOST_RECENT_TASKS,
    UNRATED_INFLUENCERS,
    ADD_RATING,
    MARK_DASHBOARD_TASK_COMPLETE,
    CANCEL_DASHBOARD_TASK,
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

export const addRating = (data, email) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.put(`${ROOT_URL}/influencers/rate`,data, {params:{email:email}})
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: ADD_RATING,
                payload: response
            })
        })
}

export const cancelTask = (taskId, nextFun) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.put(`${ROOT_URL}/tasks/delete`, {params:{taskId:taskId}})
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: CANCEL_DASHBOARD_TASK,
                payload: response
            })
            nextFun()
        })
}

export const markComplete = (taskId,nextFun) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.put(`${ROOT_URL}/tasks/complete/${taskId}`)
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: MARK_DASHBOARD_TASK_COMPLETE,
                payload: response
            })
            nextFun()
        })
}