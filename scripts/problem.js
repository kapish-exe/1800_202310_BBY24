function reportProblem() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.

    
          var problemReported = document.getElementById("textarea").value;
          db.collection("problems_reported").doc(user.uid).set({
            username: user.uid,
            problem :problemReported,
            last_updated: firebase.firestore.FieldValue
              .serverTimestamp() //current system time
          }).then(() => {
            alert("problem reported succesfully")
            // var docid = doc.id;
          })
        } else {
          // No user is signed in.
          console.log("Error, no user signed in");
        }
      });
}