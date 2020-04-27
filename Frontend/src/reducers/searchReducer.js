import { 
    SEARCH_TASKS, 
    SEARCH_PEOPLE,
} from '../actions/types';

const initialState = {
    tasks: [],
    people: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case SEARCH_TASKS:
            return {
                ...state,
                tasks: action.payload.message,
            };
        case SEARCH_PEOPLE:
            return {
                ...state,
                people: action.payload.message,
            };
            default:
            return state;
    }
}