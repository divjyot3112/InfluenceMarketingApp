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
                ratingsMap: action.payload.ratings
            };

        case SEARCH_PEOPLE_SORTED_AZ:
            let sortedPeopleAZ = []
            const peopleAZ = action.payload.message
            sortedPeopleAZ = peopleAZ.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName))
            return {
                ...state,
                people: sortedPeopleAZ,
                ratingsMap: action.payload.ratings
            };

        case SEARCH_PEOPLE_SORTED_ZA:
            let sortedPeopleZA = []
            const peopleZA = action.payload.message
            sortedPeopleZA = peopleZA.sort((a, b) => b.name.firstName.localeCompare(a.name.firstName))
            return {
                ...state,
                people: sortedPeopleZA,
                ratingsMap: action.payload.ratings
            };

        case SORT_INCOME_LOW_TO_HIGH:
            var data = state.tasks.sort(function (a, b) {
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