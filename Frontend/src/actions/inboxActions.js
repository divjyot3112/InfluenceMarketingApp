import axios from 'axios';
import {
    FETCH_CONVERSATIONS,
    SEND_MESSAGE,
    MARK_READ
} from './types';

export const fetchConversations = (email, nextFun) => dispatch => {
    console.log("Fetch Conversations action")
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:5000/api/inbox`, { params: { email: email} })
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
    axios.post(`http://localhost:5000/api/inbox/send`,data)
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
    axios.post(`http://localhost:5000/api/inbox/markread`,data)
        .then((response) => { //Action dispatched
            console.log("Response", response);
            dispatch({
                type: MARK_READ,
                payload: response
            })
            nextFun()
        })
        
}