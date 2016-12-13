import * as types from '../constants/ActionTypes'
import { Record, Map } from 'immutable'

const item = Record({
    "id": "",
    "city": "",
    "error":""
})

const initialState = {
    notes:[]
}

export default function notes(state = initialState, action) {

    switch (action.type) {

        case 'CREATE_SUCCESS':
            console.log('CREATE_SUCCESS-red')
            return  state



        case 'LOAD_NOTES_SUCCESS':
            console.log('LOAD_NOTES_SUCCESS')
            return {
                ...state,
                notes:action.notes
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