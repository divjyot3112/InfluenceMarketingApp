import {combineReducers} from 'redux';
import {reducer as formReducer} from "redux-form";
import userReducer from './userReducer';
import {dashboardTasksReducer, dashboardNumPageReducer, dashboardCurrentPageTasksReducer} from './dashboardReducer';
import userProfileReducer from "./userProfileReducer";
import taskReducer from "./taskReducer";
import ratingReducer from "./ratingReducer";
import { fetchConversationsReducer } from './inboxReducer';

export default combineReducers({
    user: userReducer,
    dashboardTasks: dashboardTasksReducer,
    dashboardNumPages: dashboardNumPageReducer,
    dashboardCurrentPageTasks: dashboardCurrentPageTasksReducer,
    conversations: fetchConversationsReducer,
    userProfile: userProfileReducer,
    task: taskReducer,
    rating: ratingReducer,
    form: formReducer
});