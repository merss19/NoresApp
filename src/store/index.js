import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import createLogger from 'redux-logger';
import api from '../middlewares/api'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'

const logger = createLogger()

/* const routing = store => next => action => {
    const { callAPI, type, ...rest } = action
    if (action.type === 'ROUTING') {
        console.log('ROUTING')
        console.log(browserHistory)
        browserHistory[action.payload.method](action.payload.nextUrl)
    }


    return next(action)

}*/

const enhancer = compose(
    applyMiddleware(thunk, api, logger)
)

const store = createStore(reducer, {}, enhancer)


export default store