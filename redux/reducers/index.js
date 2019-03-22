import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import GeneralReducer from './GeneralReducer';
import RegisterReducer from './CreateUserReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import BeersReducer from './BeersReducer';
import BeersFromUserReducer from './BeersFromUserReducer';

const reducers = combineReducers({
    login: LoginReducer,
    general: GeneralReducer,
    createUser: RegisterReducer,
    beers: BeersReducer,
    beersFromUsers: BeersFromUserReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));
export { store, reducers };
