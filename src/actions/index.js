import * as types from '../constants/ActionTypes'
import firebase from 'firebase';
import { firebaseAuth, firebaseApp} from '../firebase'
var _ = require('lodash')

const auth = firebase.auth()



export function signIn(login, pass) {

    const promise = auth.signInWithEmailAndPassword(login, pass)

    return (dispatch) => {

        dispatch({
            type: 'INIT_AUTH'
        })

        promise.catch(error => {
                console.log('signIn -action-error')
                console.log(error)
                dispatch(authError(error))



        })

        dispatch(AuthSuccess())

        dispatch({
            type: 'ROUTING',
            payload: {
                method: 'replace',
                nextUrl: '/notes'
            }
        })

    }

}

export function signUp(login, pass) {

    const promise = auth.createUserWithEmailAndPassword(login, pass)

    return (dispatch) => {

        dispatch({
            type: 'INIT_AUTH'
        })

        promise.catch(error => {
            dispatch(authError(error))

        })
        dispatch(AuthSuccess())
    }

}

export function createNote(note,id) {
    console.log('createNote-action')
    console.log(note)
    console.log(id)
    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId)
        if(id.length){
            console.log('createNote-update')
            firebase.database().ref('users/' + userId).child('notes/'+id).update(note)
            dispatch({
                type: 'UPDATE_SUCCESS'
            })
        } else {
            console.log('createccccccccccccccccccccccccccccccccccccccccccccccccccccc')
            firebase.database().ref('users/' + userId).child('notes').push().set(note)
            console.log('createNote-action-success')

            dispatch({
                type: 'CREATE_SUCCESS'
            })
        }

    }


}

export const setFilter = (filter) => {
    console.log('SET_FILTER')
    console.log(filter)
    return {
        type: 'SET_FILTER',
        filter:filter
    }
}

export function deleteNote(id) {
    console.log('deleteNote')
    console.log(id)

        console.log('deleteNote -return')
        const userId = firebase.auth().currentUser.uid;
        console.log(firebase.database().ref('users/' + userId))
        firebase.database().ref('users/' + userId).child('notes/'+id).remove()
        console.log('deleteNote -del')

}


export function loadNotes() {
    console.log('loadNotes-action')
    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId)
        const notes = firebase.database().ref('users/' + userId).child('notes')
        notes.on('value', snap =>{
            console.log('loadNotes-action-valuefff')
            console.log(snap.val())
            let list = []
            _.mapKeys(snap.val(), (value, key) => {
                console.log(key + value)

                list.push({
                    id:key,
                    value
                })
                console.log(list)
            });
                dispatch({
                    type: 'LOAD_NOTES_SUCCESS',
                    notes:list
                 })
        })

    }


}
export function authError(error) {
    console.log('authError')
    return {
        type: 'AUTH_ERROR',
        error: error.message
    };
}


export function AuthSuccess() {
    return {
        type: 'AUTH_SUCCESS'
    };
}
export function initAuth() {

    return {
        type: 'INIT'
    };
}

export function logout() {

    const auth = firebase.auth()
    return dispatch => {

        auth.signOut()
            .then(() => dispatch(signOut()))
    }
}

export function signOut() {
    return {
        type: 'SIGN_OUT'
    };
}