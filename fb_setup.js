/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAu1V43MdfTMR2v_1uZahvkvL22TZS4C4",
  authDomain: "comp-38a34.firebaseapp.com",
  databaseURL: "https://comp-38a34-default-rtdb.firebaseio.com",
  projectId: "comp-38a34",
  storageBucket: "comp-38a34.firebasestorage.app",
  messagingSenderId: "504488074470",
  appId: "1:504488074470:web:90d9f85faf66e0441f6f27",
  measurementId: "G-LGV3RGZ7PE"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);
