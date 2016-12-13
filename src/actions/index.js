import * as types from '../constants/ActionTypes'
import firebase from 'firebase';
import { firebaseAuth, firebaseApp} from '../firebase'

export function addCity(text) {
    console.log('addCity-action')
  return { type: types.ADD_CITY, text }
}

export function deleteCity(id) {
  return { type: types.DELETE_CITY, id }
}

export function loadCity(city) {
    console.log('loadCity-action')
  return {
    type: types.LOAD_CITY,
    api: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b1c0b967a2eae065899828eab3a7ae46`
  }
}


export function autocomplete(text) {

    return {
        type: types.AUTO,
        api: `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=b1c0b967a2eae065899828eab3a7ae46`
    }
}

export function autocompleteDelete() {
    return { type: types.DELETE_AUTO}
}

export function signIn(login, pass) {
    console.log('SIGN_IN-action')
    console.log(login + pass)
    const auth = firebase.auth()

    const promise = auth.signInWithEmailAndPassword(login, pass)
    return (dispatch) => {

        dispatch({
            type: 'INIT_AUTH'
        })


        promise.catch(error => {
            console.log('SIGN_IN-action-promiss')
            if (error) {
                console.log('signIn -action-error')
                console.log(error)
                dispatch(signInError(error))

            } else {
                console.log('signIn -action-error')
                console.log(error)
                dispatch(signInSuccess(error))
            }

        })

        dispatch({
            type: 'ROUTING',
            payload: {
                method: 'replace', //или, например, replace
                nextUrl: '/notes'
            }
        })
    }

}

export function signUp(login, pass, name) {
    console.log('signUp-action')
    console.log(login + pass)
    const auth = firebase.auth()

    const promise = auth.createUserWithEmailAndPassword(login, pass)
    return (dispatch) => {

        dispatch({
            type: 'INIT_AUTH'
        })


        promise.catch(error => {
            console.log('signUp-action-promiss')
            if (error) {
                console.log('signUp -action-error')
                console.log(error)
                dispatch(signUpError(error))

            } else {
                console.log('signUp -action-error')
                console.log(error)
                dispatch(signUpSuccess(error))
            }

        })
    }

}

export function createNote(note) {
    console.log('createNote-action')
    console.log(note)
    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId)
        firebase.database().ref('users/' + userId).child('notes').push().set(note)
        console.log('createNote-action-success')

        dispatch({
            type: 'CREATE_SUCCESS'
        })
    }


}

export function loadNotes() {
    console.log('loadNotes-action')
    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId)
        const notes = firebase.database().ref('users/' + userId).child('notes')
        notes.on('value', snap =>{
            console.log('loadNotes-action-value')
            console.log(snap.val())
                dispatch({
                    type: 'LOAD_NOTES_SUCCESS',
                    notes:snap.val()
                 })
        })

    }


}
export function signInError(error) {
    console.log('signInError')
    return {
        type: 'SIGN_IN_ERROR',
        payload: error
    };
}

export function signUpError(error) {
    console.log('signUpError')
    return {
        type: 'SIGN_UP_ERROR',
        payload: error
    };
}

export function initAuth() {
    console.log('initAuth')
    return {
        type: 'INIT'
    };
}

export function logout() {
    console.log('logout')
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