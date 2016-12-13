import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import cities from './cities'
import auto from './auto'
import auth from './auth'
import notes from './notes'
export default combineReducers({
    cities,
    auto,
    auth,
    notes,
    routing: routerReducer
})