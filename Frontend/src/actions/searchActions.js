import axios from 'axios';
import { 
    SEARCH_TASKS,
    ROOT_URL,

} from './types';

export const searchTasks = data => dispatch => {
    console.log("Search Actions")
    axios.defaults.withCredentials = true;
    axios
        .get(`${ROOT_URL}/tasks`, { params: { title : data.title } })
        .then(res => {
            console.log(res);
            dispatch({
                type: SEARCH_TASKS,
                payload: res.data
            })
        })
};