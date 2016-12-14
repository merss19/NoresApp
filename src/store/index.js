import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import createLogger from 'redux-logger';

import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'

const logger = createLogger()


const enhancer = compose(
    applyMiddleware(thunk, logger)
)

const store = createStore(reducer, {}, enhancer)


export default store