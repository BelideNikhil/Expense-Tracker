import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


//save this in env file and the use it in production.
const firebaseConfig = {
    apiKey: "AIzaSyDNMPLb-hP4_kV59kBraGMCG840WU0sGII",
    authDomain: "expense-tracker-7511a.firebaseapp.com",
    projectId: "expense-tracker-7511a",
    storageBucket: "expense-tracker-7511a.appspot.com",
    messagingSenderId: "949848535309",
    appId: "1:949848535309:web:66ebbb040be87c5370c044"
};


//init
const app=firebase.initializeApp(firebaseConfig)
//firestore service--for services like data
const ProjectFirebase=app.firestore()
//auth service--for auth'n services
const ProjectAuth=app.auth()
//timestamp to order lists by ascending or decending
const Timestamp=firebase.firestore.Timestamp

export {ProjectFirebase,ProjectAuth,Timestamp}
