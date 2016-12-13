import * as types from '../constants/ActionTypes'
import { Record, Map } from 'immutable'

const item = Record({
    "id": "",
    "city": "",
    "error":""
})

const initialState = Map(new item({
    "id": "",
    "city": "",
    "error":""
}))

export default function auto(state = initialState, action) {

    switch (action.type) {

        case types.AUTO + types.FAIL:
            return state
                    .set('error',action.error)

        case types.AUTO + types.SUCCESS:
            return state.set('id',action.data.id)
                        .set('city',action.data.name)
                        .set('error',"")

        case types.DELETE_AUTO:
            return state.set('id','')
                        .set('city','')

        default:
            return state
    }
}