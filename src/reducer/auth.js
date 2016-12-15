import * as types from '../constants'
import { Record, Map } from 'immutable'



const initialState = {
    loading: false,
    load: false,
    logged: false,
    error:''
}

export default function auth(state = initialState, action) {

    switch (action.type) {



        case types.INIT:
            return {
                ...state,
                logged:true

            }

        case types.INIT_AUTH:
            return {
                ...state,
                loading:true

            }

        case types.AUTH_ERROR:
            return {
                ...state,
                error:action.error,
                loading:false
            }


        case types.AUTH_SUCCESS:
            return {
                ...state,
                error:'',
                loading:false,
                logged:true
            }

        case types.SIGN_OUT:
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