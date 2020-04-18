import {combineReducers} from 'redux';
import {reducer as formReducer} from "redux-form";
import userReducer from './userReducer';
import {dashboardTasksReducer, dashboardNumPageReducer, dashboardCurrentPageTasksReducer} from './dashboardReducer';
import userProfileReducer from "./userProfileReducer";


export default combineReducers({
    user: userReducer,
    dashboardTasks: dashboardTasksReducer,
    dashboardNumPages: dashboardNumPageReducer,
    dashboardCurrentPageTasks: dashboardCurrentPageTasksReducer,
    userProfile: userProfileReducer,
    form: formReducer
});