/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/


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

/****************************************/ 
//High score table
//
/****************************************/ 


function highScore(){
  console.log('High Scores')
  firebase.database().ref('/').set(
    {
      highScoreTable: {
        users: {
          Jack: {
            personalBest: 1000,
            lowestScore: 20,
          },
          Asha: {
            personalBest: 619,
            lowestScore: 52,
          },
          Michael: {
            personalBest: 582,
            lowestScore: 122,
          }
        }
      }
    }
  )
}

//Reading High Score Table
//
function fb_readHST(){
  console.log("Reading high scores");
  firebase.database().ref('/highScoreTable/users').once('value', fb_displayHighScoresTable, fb_readError);
}

//Reading New Scores
//
function fb_readNewScores(){
  console.log("Reading new scores");
  firebase.database().ref('/highScoreTable/users').once('value', fb_displayNewScore, fb_readError);
}

//Reading High Scores Table (Sort by score)
//
function fb_readHSTSortByScore(){
  console.log("Reading high scores, sorting by scores");
  firebase.database().ref('/highScoreTable/users').orderByChild('personalBest').once('value', fb_displayHighScoresTable, fb_readError);
}

//Reading High Score Table (Sort by name / alphabetical order)
//
function fb_readHSTSortByName(){
  console.log("Reading high scores");
  firebase.database().ref('/highScoreTable/users').orderByKey().once('value', fb_displayHighScoresTable, fb_readError);
}


function fb_showOneScore(child){
  console.log(child.key+"'s personal best is "+ child.val().personalBest+ " points");
}

//Display functions
//
function fb_displayHighScoresTable(snapshot){
  snapshot.forEach(fb_showOneScore)
}

function fb_displayNewScore(snapshot){
  let highScores = snapshot.val()

  console.log("Bobert got a highest score of " + highScores["Bobert"].personalBest + " points and a lowest score of " + highScores["Bobert"].lowestScore)

}


//Add new player
//
function addNewPlayer(){
  console.log("Adding Bobert");
  firebase.database().ref('/highScoreTable/users/' + "Bobert").set(
    {
        personalBest: 120,
        lowestScore: 100,
    }
  )
}



//Messages
function helloWorld(){
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'Kia ora'
    }
  )
}

function goodbye(){
  console.log("Running goodbye()")
  firebase.database().ref('/').set(
    {
      message: 'Ka kite ano'
    }
  )
}

function read(){
  console.log("Reading message");
  firebase.database().ref('/').child('message').once('value', display, fb_readError);
  console.log("Leaving simpleRead")
}

function fb_readListener(){
  console.log('Read Listener')
  firebase.database().ref('/message').on('value', read, fb_readError);
}

function display(snapshot){
  var data = snapshot.val();
  HTML_OUTPUT.innerHTML = snapshot.val();
  if (data == null) {
    console.log("There's no message")
  }
  else {
    console.log("Running display(), the message is: " + snapshot.val())
  }
}

//error handler
function fb_readError(error) {
  console.log("There was an error reading the message")
  console.log(error);
} 
