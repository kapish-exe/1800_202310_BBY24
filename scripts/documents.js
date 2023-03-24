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


      db.collection("documentsAll").add({
        owner: user.uid,
        // user: userUserName,
        last_updated: firebase.firestore.FieldValue
          .serverTimestamp() //current system time
      }).then(doc => {
        console.log("Post document added!");
        console.log(doc.id);
        uploadPic(doc.id);
        // var docid = doc.id;
        db.collection("userDocs").doc(user.uid).update({
            "userDocuments" : firebase.firestore.FieldValue.arrayUnion(doc.id)
        })
      }).catch(function(error){
        console.log("Error in updating the userDocs table" + error)
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
          db.collection("documentsAll").doc(postDocID).update({
            "image": url, // Save the URL into users collection
          }).then(()=>{
            console.log("Added the picture to firestore")
          })
        }).catch(function (error) {
          console.log("Error getting download URL. " + error);
        })
    });
};

//hiding the image div after the user has clickewd in the upload post
function hideImageDiv(){
  imagediv = getElementById("document-grid");
}