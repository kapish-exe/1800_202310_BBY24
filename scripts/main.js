function insertNameFromFireStore() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            currentUser = db.collection("users").doc(user.uid);
              //print the user name in the browser console
            currentUser.get().then(userDoc=>{
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
  
 //function for the choosing images on upload-docs page
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


 var ImageFile;
  function listenFileSelect(){
    var fileInput = document.getElementById("upload-choose-file");

    //When a change happens:
    fileInput.addEventListener('change', function(e){
      ImageFile = e.target.files[0]
      var blob = URL.createObjectURL(ImageFile)
      Image.src = blob;
    })
  } listenFileSelect();
  

  //saving the image
  function uploadPic(){
    firebase.auth().onAuthStateChanged(function (user) {
      if(user){
        console.log("Inside uploadpic " + user.uid)
        var storageRef = storage.ref("images/" + user.uid + ".jpg")

        storageRef.put(ImageFile)

        .then(function () {

          console.log("Uploaded to cloud");
          storageRef.getDownloadURL()

          .then(function (url) {
            console.log("Got the download url")
            db.collection("documents").doc(user.uid).update({
              "image" : url
            })

            .then(function () {
              console.log("Added")
            })
          })
        })
      }else{
        console.log("No one signed in")
      }
    })
  }
  
  
  