
import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyB9O5pw4pAacFAeXvJEGWKUkQhtrwODyTg",
    authDomain: "campus-recruitment-syste-87d87.firebaseapp.com",
    databaseURL: "https://campus-recruitment-syste-87d87.firebaseio.com",
    projectId: "campus-recruitment-syste-87d87",
    storageBucket: "campus-recruitment-syste-87d87.appspot.com",
    messagingSenderId: "815916051001"
  };
  firebase.initializeApp(config);

let db = firebase.database();


export function signupAction(user) {
    return dispatch =>{
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCreated)=>{
            delete user.password;
            user.uid = userCreated.uid;
            db.ref(`users/ ${userCreated.uid} /`).set(user)
            
            history.push('/signin');
            
            
        })
        .catch((error)=>{
            return dispatch => {
                dispatch({ type : ActionTypes.ERRORMSG, payload : error})
            }
        
        })
    }
}


export function signinAction(logedinUser) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(logedinUser.email, logedinUser.password)
        .then((signedinUser) => {
            db.ref(`users/ ${signedinUser.uid} /`).once("value")
            .then((data)=>{
                let signedinUserObj = data.val();
                if(data.val().userType === "student"){
                    dispatch({ type : ActionTypes.STUDENT, payload : signedinUserObj})
                    history.push("/students")
                } 
                else if(data.val().userType === "company"){
                    dispatch({type: ActionTypes.COMPANY, payload : signedinUserObj})
                    
                    history.push("/company")                  
                }
                else {
                    history.push("/admin")
                    dispatch({type: ActionTypes.ADMIN, payload : signedinUserObj})
                    

                    
                }
            }) 
            
        })
        .catch((error)=>{
            return dispatch => {
                dispatch({ type : ActionTypes.ERRORMSG, payload : error})
            }
        
        })
                
    }
}

export function addUserDetail(userDetailObj){
    return dispatch => {
        firebase.database().ref('/').child("students").push(userDetailObj)
        .then((success)=>{

        })
        .catch((error)=>{
            return dispatch => {
                dispatch({ type : ActionTypes.ERRORMSG, payload : error})
            }
        
        })
    }
}

export function jobPostAction(jobPostObj){
    return dispatch => {
        
        firebase.database().ref('/').child(`jobPosts/ ${jobPostObj.uid}/`).push(jobPostObj)
        .then((success)=>{
        })
        .catch((error)=>{
            return dispatch => {
                dispatch({ type : ActionTypes.ERRORMSG, payload : error})
            }
        
        })
    }
}

export function getingMyAllPost(uid){
    return dispatch => {
        firebase.database().ref('/').child(`jobPosts/ ${uid}`).once("value")
        .then((snap)=> {
            let jobPost = snap.val()
            let jobPostArr = [];
                for(var key in jobPost){
                    jobPostArr.push(jobPost[key])
                }

            dispatch({ type : ActionTypes.MYALLPOSTS , payload : jobPostArr})

        })
    }
}
export function getingAllStudents(){
    return dispatch => {
        
        firebase.database().ref('/').child(`students`).once("value")
        .then((snap)=>{
            let studentsObj = snap.val();
            let studentArr = [];
                for(var key in studentsObj){
                    studentArr.push(studentsObj[key])
                }
                dispatch({ type: ActionTypes.ALLSTUDENTS , payload : studentArr})
        })
    }
}

export function getAllJobsAction(){
    return dispatch => {
        
        firebase.database().ref('/').child(`jobPosts`).once("value")
        .then((snap)=>{
            // let jobsObj = snap.val();
            let jobArr = [];
            snap.forEach((data)=>{
                for(var key in data.val()){
                    jobArr.push(data.val()[key])
                }
            })
                dispatch({ type: ActionTypes.ALLJOBS , payload : jobArr})
        })
    }
}

export function getingAccountsAction(){
    return dispatch => {
        
        firebase.database().ref('/').child(`users`).once("value")
        .then((snap)=>{
            let usersObj = snap.val();
            let usersArr = [];
                for(var key in usersObj){
                    usersArr.push(usersObj[key])
                }
               
                dispatch({ type: ActionTypes.ALLUSERS , payload : usersArr})
        })
    }
}

export function deleteAction(index, deleteType){
    return dispatch =>{
        // firebase.database().ref('/').child("users/"+ deleteUser.uid ).remove();
        dispatch({type : deleteType , payload : index  })
        // console.log(index, deleteType, "deleteUser")
    }
}