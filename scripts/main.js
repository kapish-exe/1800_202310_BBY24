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



//kapish's stuff beloww



//function to start camera when pressed on "take a photo in the upload-docs.html page"
function openCamera() {
  const video = document.createElement('video');
  // video.style.display = 'none';

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();

      video.style.display = 'block';
    })
    .catch(error => {
      console.error('Error accessing camera:', error);
    });
}

// function for the choosing images on upload-docs page
// const fileUpload = document.getElementById("file-upload");
// const uploadChooseFile = document.getElementById("upload-choose-file");

// uploadChooseFile.addEventListener('click', () => {
//   const file = fileUpload.files[0];
//   const filename = file.name;
//   const fileRef = storage.child(filename);

//   fileRef.put(file).then(snapshot => {
//     console.log('File uploaded successfullt');
//     const fileURL = snapshot.ref.getDownloadURL();
//     db.push({
//       filename: filename,
//       url: fileURL
//     })
//   }).catch(error => {
//     console.error(error);
//   })
// })


//function for the choosing images on upload-docs page
//creating a reference to the storage bucket



var ImageFile; 
function listenDocumentSelect(){
  var fileInput = document.getElementById("file-upload"); // pointer #1

  fileInput.addEventListener('change', function (e) {
    ImageFile = e.target.files[0];   //Global variable
  });
} listenDocumentSelect();

function savePic() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here. 
      // var desc =  userDoc.data().username;


      db.collection("userDocuments").add({
        owner: user.uid,
        // user: userUserName,
        last_updated: firebase.firestore.FieldValue
          .serverTimestamp() //current system time
      }).then(doc => {
        console.log("Post document added!");
        console.log(doc.id);
        uploadPic(doc.id);
      })
    } else {
      // No user is signed in.
      console.log("Error, no user signed in");
    }
  });
}

//function for the storing images in fire storage
function uploadPic(postDocID) {
  console.log("inside uploadPic " + postDocID);
  var storageRef = storage.ref("documents/" + postDocID + ".jpg");

  storageRef.put(ImageFile)   //global variable ImageFile
    // AFTER .put() is done
    .then(function () {
      console.log('Uploaded to Cloud Storage.');
      storageRef.getDownloadURL()
        // AFTER .getDownloadURL is done
        .then(function (url) { 
          // Get URL of the uploaded file
          console.log("Got the download URL.");
          db.collection("userDocuments").doc(postDocID).update({
            "image": url // Save the URL into users collection
          }).then(()=>{
            console.log("Added the picture to firestore")
          })
        }).catch(function (error) {
          console.log("Error getting download URL.");
        });
    });
};

//hiding the image div after the user has clickewd in the upload post
function hideImageDiv(){
  imagediv = getElementById("document-grid");
}