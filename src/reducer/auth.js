import * as types from '../constants/ActionTypes'
import { Record, Map } from 'immutable'

const item = Record({
    "id": "",
    "city": "",
    "error":""
})

const initialState = {
    loading: false,
    load: false,
    logged: false,
    error:{}
}

export default function auth(state = initialState, action) {

    switch (action.type) {

        case 'SIGN_OUT':
            console.log('INIT')
            return {
                ...state,
                logged:false
            }

        case 'INIT':
            console.log('INIT')
            return {
                ...state,
                logged:true
            }

        case 'INIT_AUTH':
            console.log('INIT_AUTH')
            return state

        case 'SIGN_IN_ERROR':
            console.log('SIGN_IN_ERROR-red')
            return {
                ...state,
                error:action.payload
            }

        case 'SIGN_UP_ERROR':
            console.log('SIGN_UP_ERROR-red')
            return {
                ...state,
                error:action.payload
            }

        default:
            return state
    }
}