import { 
    SEARCH_TASKS, 
} from '../actions/types';

const initialState = {
    tasks: [],
}

export default function(state = initialState, action) {
    switch(action.type){
        case SEARCH_TASKS:
            return {
                ...state,
                tasks: action.payload.message,
            };
            default:
            return state;
    }
}