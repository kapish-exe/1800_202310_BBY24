function insertNameFromFireStore() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the currently logged-in user here: 
      console.log(user.uid); //print the uid in the browser console
      currentUser = db.collection("users").doc(user.uid);
      //print the user name in the browser console
      currentUser.get().then(userDoc => {
        var userUserName = userDoc.data().username;
        console.log(userUserName);
        document.getElementById("name-goes-here").innerText = userUserName;
      })



    }
  });
}
insertNameFromFireStore(); //run the function

