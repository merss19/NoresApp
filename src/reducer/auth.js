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
    error:''
}

export default function auth(state = initialState, action) {

    switch (action.type) {

        case 'SIGN_OUT':

            return {
                ...state,
                logged:false,
                error:''
            }

        case 'INIT':
            return {
                ...state,
                logged:true

            }

        case 'INIT_AUTH':
            return {
                ...state,
                loading:true

            }

        case 'AUTH_ERROR':
            console.log('AUTH_ERROR-red')
            console.log(action.error)
            return {
                ...state,
                error:action.error,
                loading:false
            }


        case 'AUTH_SUCCESS':
            return {
                ...state,
                error:'',
                loading:false
            }

        default:
            return state
    }
}