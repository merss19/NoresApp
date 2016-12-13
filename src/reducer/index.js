import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import cities from './cities'
import auto from './auto'
import auth from './auth'

export default combineReducers({
    cities,
    auto,
    auth,
    routing: routerReducer
})