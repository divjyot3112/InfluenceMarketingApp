import {
    SEARCH_TASKS,
    SEARCH_PEOPLE,
    SEARCH_PEOPLE_SORTED_AZ,
    SEARCH_PEOPLE_SORTED_ZA,
    SORT_INCOME_LOW_TO_HIGH,
    SORT_INCOME_HIGH_TO_LOW,
    MOST_RECENT_TASKS,
} from '../actions/types';

const initialState = {
    tasks: [],
    people: [],
    avgRatings: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_TASKS:
            return {
                ...state,
                tasks: action.payload.message,
            };

        case SEARCH_PEOPLE:
            return {
                ...state,
                people: action.payload.message,
                avgRatings: action.payload.ratings
            };

        case SEARCH_PEOPLE_SORTED_AZ:
            var data = state.people.sort(function (a, b) {
                return a.name.firstName.localeCompare(b.name.firstName);
            })

            return {
                ...state,
                people: data,
            };

        case SEARCH_PEOPLE_SORTED_ZA:
            data = state.people.sort(function (a, b) {
                return b.name.firstName.localeCompare(a.name.firstName);
            })

            return {
                ...state,
                people: data,
            };

        case SORT_INCOME_LOW_TO_HIGH:
            data = state.tasks.sort(function (a, b) {
                return a.salary - b.salary
            })
            return {
                ...state,
                tasks: data,
            };

        case SORT_INCOME_HIGH_TO_LOW:
            data = state.tasks.sort(function (a, b) {
                return b.salary - a.salary
            });

            return {
                ...state,
                tasks: data,
            };

        case MOST_RECENT_TASKS:
            data = state.tasks.sort(function (a, b) {
                return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime()
            });

            return {
                ...state,
                tasks: data,
            };

        default:
            return state;
    }
}