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
  firebase.database().ref('/highScoreTable/users').once('value', fb_displayHighScore, fb_readError);
}

function fb_readHighScoresTable(){
  console.log("Reading high scores");
  firebase.database().ref('/highScoreTable/users').once('value', fb_displayHighScoresTable, fb_readError);
}

function fb_displayHighScoresTable(snapshot){
  let highScores = snapshot.val()
  let names = Object.keys(highScores);
  console.log(names)
  for(i = 0; i < names.length;i++){
    let key = names[i];
    console.log("Score " +i+ " is for " + key + ". Highest score of " + highScores[key].personalBest + " points and lowest score of " + highScores[key].lowestScore)
  }

}

function fb_displayHighScore(snapshot){
  let highScores = snapshot.val()

  console.log("Robert got a highest score of " + highScores["Robert"].personalBest + " points and a lowest score of " + highScores["Robert"].lowestScore)

}

function addNewPlayer(){
  console.log("Adding Robert");
  firebase.database().ref('/highScoreTable/users/' + "Robert").set(
    {
        personalBest: 120,
        lowestScore: 100,
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

/**********************************************/ 
//Read
//
/**********************************************/ 

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

function fb_readError(error) {
  console.log("There was an error reading the message")
  console.log(error);
} 
