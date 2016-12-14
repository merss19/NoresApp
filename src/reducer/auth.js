import * as types from '../constants/ActionTypes'
import { Record, Map } from 'immutable'



const initialState = {
    loading: false,
    load: false,
    logged: false,
    error:''
}

export default function auth(state = initialState, action) {

    switch (action.type) {



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
            return {
                ...state,
                error:action.error,
                loading:false
            }


        case 'AUTH_SUCCESS':
            return {
                ...state,
                error:'',
                loading:false,
                logged:true
            }

        case 'SIGN_OUT':
            return {
                ...state,
                logged:false,
                error:'',
                loading:false
            }

        default:
            return state
    }
}