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
                    var userName = userDoc.data().username;
                    // var userEmail = userDoc.data().email
                    var description = userDoc.data().bio;
                    var userLocation = userDoc.data().location;
                    let picUrl = userDoc.data().profilePic;



                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("userNameInput").value = userName;
                    }
                    if (description != null) {
                        // document.getElementById("emailInput").value = userEmail;
                        document.getElementById("bioInput").value = description;
                    }
                    if (userLocation != null) {
                        document.getElementById("locationInput").value = userLocation;
                    }
                    if (picUrl != null) {
                        console.log(picUrl);
                        // use this line if "mypicdiv" is a "div"
                        //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                        $("#mypic-goes-here").attr("src", picUrl);
                    } else
                        console.log("picURL is null");
                })

        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();


function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;

}



// CODING FOR PROFILE IMAGE

var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"=
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();


function saveUserImage() {
    alert("CHANGES ARE SAVED");
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
                        //get values from the from


                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({

                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');

                            })
                    })
            })
    })
} function saveUserInfo() {
    //enter code here

    //a) get user entered values
    userUserName = document.getElementById('userNameInput').value;       //get the value of the field with id="nameInput"
    description = document.getElementById('bioInput').value;     //get the value of the field with id="schoolInput"
    userLocation = document.getElementById('locationInput').value;       //get the value of the field with id="cityInput"

    //b) update user's document in Firestore
    currentUser.update({
        username: userUserName,
        bio: description,
        location: userLocation
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}




//   // Get a reference to the delete button element
//   const deleteButton = document.getElementById('delete-button');

//   // Add a click event listener to the delete button
//   deleteButton.addEventListener('click', () => {
//     // Display a confirmation message using the built-in "confirm" function
//     const confirmed = confirm('Are you sure you want to delete this?');

//     // Check if the user clicked "OK" in the confirmation message
//     if (confirmed) {
//       // User confirmed, delete the item here
//       console.log('Item deleted!');
//     } else {
//       // User cancelled, do nothing
//       console.log('Delete cancelled!');
//     }
//   });






//-------------------------------------------------
// This function asks user to confirm deletion:
// 1. remove document from users collection in firestore
// 2. THEN, remove auth() user from Firebase auth
//-------------------------------------------------
function deleteUser() {
    firebase.auth().onAuthStateChanged(user => {

        // Double check! Usability Heuristics #5
        var result = confirm("WARNING " + user.displayName +
            ": Deleting your User Account!!");

        // If confirmed, then go ahead
        if (result) {
            // First, delete from Firestore users collection 
            db.collection("users").doc(user.uid).delete()
                .then(() => {
                    console.log("Deleted from Firestore Collection");

                    // Next, delete from Firebase Auth
                    user.delete().then(() => {
                        console.log("Deleted from Firebase Auth.");
                        alert("user has been deleted");
                        window.location.href = "index.html";
                    }).catch((error) => {
                        console.log("Error deleting from Firebase Auth " + error);
                    });
                }).catch((error) => {
                    console.error("Error deleting user: ", error);
                });
        }
    })
}