import {
    FETCH_CONVERSATIONS,
    SEND_MESSAGE,
    MARK_READ,
    FETCH_ALL_USERS_INBOX
} from '../actions/types';

const initialState = []

export function fetchConversationsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONVERSATIONS:
            if (action.payload === undefined)
                return state
            return action.payload.data.message
        default:
            return state;
    }
}

export function sendMessageReducer(state = "", action) {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.payload === undefined)
                return state
            return action.payload.data.message
        default:
            return state;
    }
}

export function markReadReducer(state = "", action) {
    switch (action.type) {
        case MARK_READ:
            if (action.payload === undefined)
                return state
            return action.payload.data.message
        default:
            return state;
    }
}

export function fetchAllUsersForInboxReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_USERS_INBOX:
            if (action.payload === undefined)
                return state
            return action.payload.data.message
        default: return state
    }
}