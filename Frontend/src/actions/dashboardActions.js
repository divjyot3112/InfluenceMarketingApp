import axios from 'axios';
import {
    DASHBOARD_TASKS,
    DASHBOARD_CURRENT_PAGE_TASKS
} from './types';

export const fetchDashboardTasks = (email, status) => dispatch => {
    console.log("Dashboard action")
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:5000/api/tasks`, { params: { email: email, status: status } })
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: DASHBOARD_TASKS,
                payload: response
            })
        })
}


//for pagination
export const getCurrentPageTasks = (pageNum, allTasks) => dispatch => {
    dispatch({
        type: DASHBOARD_CURRENT_PAGE_TASKS,
        payload: allTasks.slice((pageNum - 1) * 12, pageNum * 12)
    })
}