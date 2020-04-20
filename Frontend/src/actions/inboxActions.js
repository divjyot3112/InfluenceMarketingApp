import axios from 'axios';
import {
    FETCH_CONVERSATIONS,
    SEND_MESSAGE,
    MARK_READ,
    FETCH_ALL_USERS_INBOX, 
    ROOT_URL
} from './types';

export const fetchConversations = (email, nextFun) => dispatch => {
    console.log("Fetch Conversations action")
    axios.defaults.withCredentials = true;
    axios.get(`${ROOT_URL}/inbox`, { params: { email: email} })
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: FETCH_CONVERSATIONS,
                payload: response
            })
            nextFun();
        })
}

export const sendMessage = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${ROOT_URL}/inbox/send`,data)
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: SEND_MESSAGE,
                payload: response
            })
            
        })
}

export const markRead = (data, nextFun) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${ROOT_URL}/inbox/markread`,data)
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: MARK_READ,
                payload: response
            })
            nextFun()
        })
        
}

export const fetchAllUsersForInbox = (nextFun) => dispatch => {
    console.log("Fetch All Users for Inbox action")
    axios.defaults.withCredentials = true;
    axios.get(`${ROOT_URL}/inbox/fetchusers`)
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: FETCH_ALL_USERS_INBOX,
                payload: response
            })
            nextFun()
        })
}