var currentUser; 

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var user_Name = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userLocation = userDoc.data().country;
                    var userUserName = userDoc.data().username;

                    //if the data fields are not empty, then write them in to the form.
                    if (user_Name != null) {
                        document.getElementById("nameInput").value = user_Name;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userLocation != null) {
                        document.getElementById("locationInput").value = userLocation;
                    }
                    if (userUserName != null) {
                        document.getElementById("userNameInput").value = userUserName;
                    }
                    
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();



function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

 function saveUserInfo(){
      var userUserName = document.getElementbyId("userNameInput").value ;
     var user_Name = document.getElementbyId("nameInput").value ;
     var userEmail = document.getElementbyId("emailInput").value ;
    var userLocation = document.getElementbyId("locationInput").value ;

     currentUser.update({
        username : userUserName,
        name: user_Name,
        email:userEmail,
        location:userLocation
         
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    document.getElementById("personalInfoFields").disabled = true;
 }

