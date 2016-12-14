import * as types from '../constants/ActionTypes'
import { Record, Map , List} from 'immutable'

const item = Record({
    "id": "",
    "city": "",
    "error":""
})

const NotesState = new Record ({
    list: new List(),
    filter:'SHOW_ALL'
})

export default function notes(state = new NotesState(), action) {

    switch (action.type) {

        case 'CREATE_SUCCESS':
            console.log('CREATE_SUCCESS-red')
            return  state



        case 'LOAD_NOTES_SUCCESS':
            console.log('LOAD_NOTES_SUCCESSdddd')
            /*return {
                ...state,
                notes:action.notes
            }*/
            return state.set('list', new List(action.notes));

        case 'SET_FILTER':
            console.log('SET_FILTER-red')
            console.log(action.filter)
            return state.set('filter', action.filter);



        default:
            return state
    }
}