import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyC42Se4Gb3CfJDblyDdPfEI0e5v4ggvu10",
  authDomain: "spk-smart.firebaseapp.com",
  databaseURL: "https://spk-smart.firebaseio.com",
  projectId: "spk-smart",
  storageBucket: "spk-smart.appspot.com",
  messagingSenderId: "41173701168"
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}

db.settings(settings)
const usersCollection = db.collection('users')
const criteriasCollection = db.collection('criterias')
const studentsCollection = db.collection('students')
const alternativesCollection = db.collection('alternatives')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  criteriasCollection,
  studentsCollection,
  alternativesCollection
}