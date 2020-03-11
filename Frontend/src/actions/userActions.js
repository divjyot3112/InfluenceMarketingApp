import axios from 'axios';
import { 
    LOGIN_USER, 
} from './types';

export const loginUser = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .post('/api/users/login', data)
        .then(res => {
            if(res.status === 200){
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('flag', res.data.flag);
                console.log(res.status);
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                })
            }
        })
};