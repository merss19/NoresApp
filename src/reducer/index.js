import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import auth from './auth'
import notes from './notes'

export default combineReducers({
    auth,
    notes,
    routing: routerReducer
})