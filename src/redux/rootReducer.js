import {combineReducers} from 'redux';
import userInfoReducer from './userInfoStore/userInfoReducer';
export default combineReducers({
    userInfo:userInfoReducer
});