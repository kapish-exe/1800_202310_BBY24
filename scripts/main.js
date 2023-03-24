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

      //method #1:  insert with html only
      // document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
      //method #2:  insert using jquery
      // $("#name-goes-here").text(user_Name); //using jquery

    }
  });
}
insertNameFromFireStore(); //run the function
