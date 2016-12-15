import * as types from '../constants'
import { Record, Map , List} from 'immutable'



const NotesState = new Record ({
    list: new List(),
    filter:'SHOW_ALL'
})

export default function notes(state = new NotesState(), action) {

    switch (action.type) {

        case types.CREATE_SUCCESS:
            return  state


        case types.LOAD_NOTES_SUCCESS:
            return state.set('list', new List(action.notes));

        case types.SET_FILTER:
            return state.set('filter', action.filter);

        case types.UNLOAD_NOTES:
            return state.set('list', new List());



        default:
            return state
    }
}