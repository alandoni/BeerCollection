import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import GeneralReducer from './GeneralReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    login: LoginReducer,
    general: GeneralReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));
export { store, reducers };
