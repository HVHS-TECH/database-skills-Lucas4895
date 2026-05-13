/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/

var GLOBAL_user;
var authenticationListener; //global variable to store the listener

 function fb_login(){
    authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
 }
 
function fb_handleLogin(_user){
    if (_user){
        console.log("User is logged in")
    } else {
        console.log("User is Not logged in - Starting the popup process")
        fb_popupLogin();
    }
}

function fb_popupLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        GLOBAL_user = result.user; //save the user details object to a global variable
        console.log("User has logged in")
    });
 };

function fb_logout(){
    authenticationListener(); //this line turns off the listener
    firebase.auth().signOut();
    console.log("logged out")
    
}