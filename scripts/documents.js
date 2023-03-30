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
var newdiv = document.getElementById("activateonsavepost");
function listenDocumentSelect() {
    var fileInput = document.getElementById("file-upload"); // pointer #1


    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        document.getElementById("doc-goes-here").src = blob;
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
                    "userDocuments": firebase.firestore.FieldValue.arrayUnion(doc.id)
                })
            }).catch(function (error) {
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
                    }).then(() => {
                        console.log("Added the picture to firestore")
                    }).then(() => {
                        console.log("reading the image")
                        var imagecontainer = document.createElement("div");
                        var image = document.createElement("img");
                        image.src = url;
                        imagecontainer.appendChild(image)

                        var deleteButton = document.createElement("button");
                        deleteButton.textContent = "Delete";
                        deleteButton.addEventListener("click", function () {
                            deleteImage(postDocID);
                            imagecontainer.remove();
                        });
                        imagecontainer.appendChild(deleteButton);

                        imagecontainer.className = "image-container";
                        imagecontainer.style.position = "relative";
                        image.style.width = "100%";
                        deleteButton.style.position = "absolute";
                        deleteButton.style.top = "0";
                        deleteButton.style.right = "0";
                        deleteButton.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
                        deleteButton.style.border = "none";
                        deleteButton.style.color = "white";
                        deleteButton.style.padding = "5px";
                        deleteButton.style.fontSize = "12px";
                        deleteButton.style.cursor = "pointer";

                        // imagediv.insertBefore(imagecontainer, imagediv.firstChild);


                        imagediv.insertBefore(imagecontainer, imagediv.firstChild)
                        console.log("done reading it")

                    })
                }).catch(function (error) {
                    console.log("Error getting download URL. " + error);
                })
        });
};

//hiding the image div after the user has clickewd in the upload post

var imagediv = document.getElementById("document-grid");
var imageheadlline = document.getElementById("document-headline");
var button = document.getElementById("file-upload");
var savebutton = document.getElementById("upload-choose-filee");

button.addEventListener("click", () => {
    imagediv.style.display = "none";
    imageheadlline.style.display = "none";

    newdiv.style.display = "flex"
    console.log("Sum")
})

savebutton.addEventListener("click", () => {
    imagediv.style.display = "flex";
    imageheadlline.style.display = "";

    newdiv.style.display = "none";

})

// const database = firebase.database().ref();

function showdocs() {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user is: " + user.uid);
        db.collection("userDocs").doc(user.uid)
            .get()
            .then(doc => {
                myposts = doc.data().userDocuments; //get array of my posts
                console.log(myposts);

                myposts.forEach(item => {
                    console.log(item)
                    db.collection("documentsAll")
                        .doc(item)
                        .get()
                        .then(doc => {
                            imageurl = doc.data().image;
                            var imagecontainer = document.createElement("div");
                            var image = document.createElement("img");
                            console.log(imageurl)
                            image.src = imageurl;
                            imagecontainer.appendChild(image)

                            var deleteButton = document.createElement("button");
                            deleteButton.textContent = "Delete";
                            deleteButton.addEventListener("click", function () {
                                deleteImage(item);
                                imagecontainer.remove();
                            });

                            imagecontainer.className = "image-container";
                            imagecontainer.style.position = "relative";
                            image.style.width = "100%";
                            deleteButton.style.position = "absolute";
                            deleteButton.style.top = "0";
                            deleteButton.style.right = "0";
                            deleteButton.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
                            deleteButton.style.border = "none";
                            deleteButton.style.color = "white";
                            deleteButton.style.padding = "5px";
                            deleteButton.style.fontSize = "12px";
                            deleteButton.style.cursor = "pointer";

                            imagecontainer.appendChild(deleteButton);

                            imagediv.insertBefore(imagecontainer, imagediv.firstChild);

                            // imagediv.insertBefore(imagecontainer, imagediv.firstChild)

                            // displayMyPostCard(doc);
                        })
                })
            })
    })
}
// showdocs();



// function to delete an image from the Firebase database
function deleteImage(itemId) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            db.collection("documentsAll").doc(itemId).delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                })
            deleteuserdoc = db.collection("userDocs").doc(user.uid)
            deleteuserdoc.update({
                "userDocuments": firebase.firestore.FieldValue.arrayRemove(itemId)
            })
            var storageRef = storage.ref("documents/" + itemId + ".jpg");
            storageRef.delete().then(() => {
                console.log("deleted from the storage too")
            })


        }
    })
} showdocs();