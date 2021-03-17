import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAXUGCFrVGnLqPqMHRCCEhcANvRpSMRzsg',
    authDomain: 'stickytime-dev.firebaseapp.com',
    projectId: 'stickytime-dev',
    storageBucket: 'stickytime-dev.appspot.com',
    messagingSenderId: '727839235538',
    appId: '1:727839235538:web:bbe6492f6979d09ffc3c0b',
    measurementId: 'G-6JC0WG7EYK',
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
