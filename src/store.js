import thunk from 'redux-thunk';
import  { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { APP_STATE } from "./constants/redux";
import {
    LOGIN_SUCCESS, LOGOUT_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS,
    TENANT_LIST_SUCCESS, CLIENT_LIST_SUCCESS, ORDER_LIST_SUCCESS,
    ASSOCIATE_LIST_SUCCESS, TASK_LIST_SUCCESS, FINANCIAL_LIST_SUCCESS,
    TAG_LIST_SUCCESS, HOW_HEAR_LIST_SUCCESS, AWAY_LOG_LIST_SUCCESS,
    SKILL_SET_LIST_SUCCESS
} from "./constants/actionTypes";
import userReducer from "./reducers/userReducer";
import tenantListReducer from "./reducers/tenantReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import flashMessageReducer from "./reducers/flashMessageReducer";
import clientListReducer from "./reducers/clientReducers";
import orderListReducer from "./reducers/orderReducers";
import associateListReducer from "./reducers/associateReducers";
import taskListReducer from "./reducers/taskReducers";
import staffListReducer from "./reducers/staffReducers";
import financialListReducer from "./reducers/financialReducers";
import tagListReducer from "./reducers/tagReducers";
import howHearListReducer from "./reducers/howHearReducers";
import awayLogListReducer from "./reducers/awayLogReducers";
import bulletinBoardItemListReducer from "./reducers/bulletinBoardItemReducers";
import skillSetListReducer from "./reducers/skillSetReducers";


// Combine Reducers
const appReducer = combineReducers({
    userState: userReducer,
    dashboardState: dashboardReducer,
    tenantListState: tenantListReducer,
    flashMessageState: flashMessageReducer,
    clientListState: clientListReducer,
    orderListState: orderListReducer,
    associateListState: associateListReducer,
    taskListState: taskListReducer,
    staffListState: staffListReducer,
    financialListState: financialListReducer,
    tagListState: tagListReducer,
    howHearListState: howHearListReducer,
    awayLogListState: awayLogListReducer,
    bulletinBoardItemListState: bulletinBoardItemListReducer,
    skillSetListState: skillSetListReducer,
});


/**
 *  Reducer to be used before the "appReducer" used. The difference with is
 *  this reducer will clear the `redux` state if the logout state was detected.
 *
 *  Special thanks to:
 *  https://stackoverflow.com/a/35641992
 */
const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined
    }
    return appReducer(state, action)
}


/**
 *  Function will save the application state if a specific 'react-redux' state
 *  was triggered.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        if ([
            LOGIN_SUCCESS, LOGOUT_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS,
            TENANT_LIST_SUCCESS, CLIENT_LIST_SUCCESS, ORDER_LIST_SUCCESS,
            TASK_LIST_SUCCESS, FINANCIAL_LIST_SUCCESS, AWAY_LOG_LIST_SUCCESS
        ].includes(result.type)) {
            // console.log("De-hydrating store...");
            localStorage.setItem(APP_STATE, JSON.stringify(getState()))
        }
        return result;
    };
};


/**
 *  Function will load up the saved app-state from the local storage on
 *  application initial startup.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const reHydrateStore = () => {
    const data = localStorage.getItem(APP_STATE);
    if (data) {
        // console.log("Re-hydrating Store...");
        const jsonData = JSON.parse(data);
        // console.log("Store Contents:", jsonData); // For debugging purposes only.
        return jsonData;
    }
    return undefined;
};


// Create our store singleton object and populate it with our initial data.
const store = createStore(
    rootReducer,
    reHydrateStore(),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            localStorageMiddleware
        )
    )
);


export default store;
