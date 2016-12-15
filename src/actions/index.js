import firebase from 'firebase';
import { firebaseApp} from '../firebase'
import * as types from '../constants'
import  _ from 'lodash'

const auth = firebase.auth()

export function signIn(login, pass) {

    const promise = auth.signInWithEmailAndPassword(login, pass)
    return (dispatch) => {

        dispatch({
            type: types.INIT_AUTH
        })

        promise.catch(error => {
            dispatch(authError(error))
        },function(){
            dispatch(AuthSuccess())

        })
    }

}

export function signUp(login, pass) {

    const promise = auth.createUserWithEmailAndPassword(login, pass)

    return (dispatch) => {

        dispatch({
            type: types.INIT_AUTH
        })

        promise.catch(error => {
            dispatch(authError(error))

        }, function(){
            dispatch(AuthSuccess())
        })

    }

}

export function createNote(note,id) {

    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid;

        if(id.length){
            firebase.database().ref('users/' + userId).child('notes/'+id).update(note)
            dispatch({
                type: types.CREATE_SUCCESS
            })
        } else {
            firebase.database().ref('users/' + userId).child('notes').push().set(note)
            dispatch({
                type: types.CREATE_SUCCESS
            })
        }

    }


}

export function deleteNote(id) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).child('notes/'+id).remove()
}


export function loadNotes() {
    return (dispatch) => {

        const userId = firebase.auth().currentUser.uid;
        const notes = firebase.database().ref('users/' + userId).child('notes')

        notes.on('value', snap =>{
            let list = []
            _.mapKeys(snap.val(), (value, key) => {
                console.log(key + value)

                list.push({
                    id:key,
                    value
                })

            });
                dispatch({
                    type: types.LOAD_NOTES_SUCCESS,
                    notes:list
                 })
        })
    }
}

export function logout() {

    const auth = firebase.auth()
    return dispatch => {
        auth.signOut()
            .then(() => dispatch(signOut()))
    }
}

export const setFilter = (filter) => {
    return {
        type: types.SET_FILTER,
        filter:filter
    }
}
export function authError(error) {

    return {
        type: types.AUTH_ERROR,
        error: error.message
    }
}


export function AuthSuccess() {
    return {
        type: types.AUTH_SUCCESS
    };
}
export function initAuth() {
    return {
        type: types.INIT
    };
}

export function unloadNotes(){
    return{
        type: types.UNLOAD_NOTES
    }
}

export function signOut() {
    return {
        type: types.SIGN_OUT
    };
}