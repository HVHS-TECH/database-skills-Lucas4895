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

function fb_readListener(){
  console.log('Read Listener')
  firebase.database().ref('/message').on('value', read, fb_readError);
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
            personalBest: 200,
            lowestScore: 20,
          },
          Sasha: {
            personalBest: 319,
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

function fb_readHighScores(){
  console.log("Reading high scores");
  firebase.database().ref('/highScoreTable/users').once('value', displayHighScore, fb_readError);
}

function displayHighScore(snapshot){
  console.log(snapshot.val())
}

function addNewPlayer(){
  console.log("Adding Robert");
  firebase.database().ref('/highScoreTable/users').set(
    {
      Robert: {
        personalBest: 120,
        lowestScore: 120,
      }
    }
  )
}


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

function fb_readError(error) {
  console.log("There was an error reading the message")
  console.log(error);
} 
