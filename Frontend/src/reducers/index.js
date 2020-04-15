import { combineReducers } from 'redux';
import userReducer from './userReducer';
import {dashboardTasksReducer, dashboardNumPageReducer, dashboardCurrentPageTasksReducer} from './dashboardReducer';

export default combineReducers({
    user: userReducer,
    dashboardTasks: dashboardTasksReducer,
    dashboardNumPages: dashboardNumPageReducer,
    dashboardCurrentPageTasks: dashboardCurrentPageTasksReducer
});