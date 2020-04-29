import axios from 'axios';
import {
    SEARCH_TASKS,
    SEARCH_PEOPLE,
    SEARCH_PEOPLE_SORTED_AZ,
    SEARCH_PEOPLE_SORTED_ZA,
    SORT_INCOME_LOW_TO_HIGH,
    SORT_INCOME_HIGH_TO_LOW,
    MOST_RECENT_TASKS,
    ROOT_URL
} from './types';

export const searchTasks = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .get(`${ROOT_URL}/tasks/search`, {params: {title: data.title, status: data.status}})
        .then(res => {
            dispatch({
                type: SEARCH_TASKS,
                payload: res.data
            })
        })
};

export const searchPeople = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .get(`${ROOT_URL}/influencers/profile`, {
            params: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            }
        })
        .then(res => {
            console.log(res);
            dispatch({
                type: SEARCH_PEOPLE,
                payload: res.data
            })
        })
};

export const searchPeopleWithAddress = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .get(`${ROOT_URL}/influencers/profile`, {
            params:
                {firstName: data.firstName, lastName: data.lastName, address: data.address}
        })
        .then(res => {
            console.log(res);
            dispatch({
                type: SEARCH_PEOPLE,
                payload: res.data
            })
        })
};

//sorting tasks
export const sortTasks = (sortBy) => dispatch => {
    if (sortBy === 1) {
        dispatch({
            type: SORT_INCOME_LOW_TO_HIGH
        })
    } else if (sortBy === 2) {
        dispatch({
            type: SORT_INCOME_HIGH_TO_LOW
        })
    } else {
        dispatch({
            type: MOST_RECENT_TASKS
        })
    }
}

//sorting users
export const sortUsers = (sortBy) => dispatch => {
    if (sortBy === 0) {
        dispatch({
            type: SEARCH_PEOPLE_SORTED_AZ
        })
    } else if (sortBy === 1) {
        dispatch({
            type: SEARCH_PEOPLE_SORTED_ZA
        })
    }
}