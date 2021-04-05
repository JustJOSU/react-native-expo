import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import coinReducer, { coinSaga } from './coinReducer';

const rootReducer = combineReducers({ coinReducer });
export function* rootSaga() {
    yield all([coinSaga()]);
}
export default rootReducer;