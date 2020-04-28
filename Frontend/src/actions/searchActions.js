import axios from 'axios';
import { 
    SEARCH_TASKS,
    SEARCH_PEOPLE,
    SEARCH_PEOPLE_SORTED_AZ,
    SEARCH_PEOPLE_SORTED_ZA,
    ROOT_URL,

} from './types';

export const searchTasks = data => dispatch => {
    console.log("Search Actions: " + data.title + " " + data.status)
    axios.defaults.withCredentials = true;
    axios
        .get(`${ROOT_URL}/tasks/search`, { params: { title: data.title, status: data.status } })
        .then(res => {
            console.log(res);
            dispatch({
                type: SEARCH_TASKS,
                payload: res.data
            })
        })
};

export const searchPeople = data => dispatch => {
    console.log("Search Actions: " + data.firstName + " " + data.lastName)
        axios.defaults.withCredentials = true;
        axios
            .get(`${ROOT_URL}/users/searchProfile`, { params: { firstName: data.firstName, lastName: data.lastName } })
            .then(res => {
                console.log(res);
                dispatch({
                    type: SEARCH_PEOPLE,
                    payload: res.data
                })
            })
};

export const searchPeopleSortedZA = data => dispatch => {
    console.log("Search Actions: " + data.firstName + " " + data.lastName)
        axios.defaults.withCredentials = true;
        axios
            .get(`${ROOT_URL}/users/searchProfile`, { params: { firstName: data.firstName, lastName: data.lastName } })
            .then(res => {
                console.log(res);
                dispatch({
                    type: SEARCH_PEOPLE_SORTED_ZA,
                    payload: res.data
                })
            })
};

export const searchPeopleSortedAZ = data => dispatch => {
    console.log("Search Actions: " + data.firstName + " " + data.lastName)
        axios.defaults.withCredentials = true;
        axios
            .get(`${ROOT_URL}/users/searchProfile`, { params: { firstName: data.firstName, lastName: data.lastName } })
            .then(res => {
                console.log(res);
                dispatch({
                    type: SEARCH_PEOPLE_SORTED_AZ,
                    payload: res.data
                })
            })
};

export const searchPeopleWithAddress = data => dispatch => {
    console.log("Search Actions: " + data.firstName + " " + data.lastName + " " + data.address)
        axios.defaults.withCredentials = true;
        axios
            .get(`${ROOT_URL}/influencers/profile`, { params: 
                { firstName: data.firstName, lastName: data.lastName, address: data.address } 
            })
            .then(res => {
                console.log(res);
                dispatch({
                    type: SEARCH_PEOPLE,
                    payload: res.data
                })
            })
};
