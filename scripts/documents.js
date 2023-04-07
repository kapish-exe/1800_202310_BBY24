/*the functions below are necessary for the documents page to function. 
  the functions does the uploading of the documents to storage and getting the url and uploading that tto the database for a particular user.
  It also writees the doc ID to the DocumentsAll database.
*/
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
                        // imagecontainer.style.
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
    newdiv.style.flexDirection = "column"
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
})
                })
            })
    })
}



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

function populateMemberCards() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("user exists");
            var household = db.collection("household").doc(user.uid);
            var members = household.collection("member");
            console.log(members);
            // document.getElementById("familymembergoeshere").innerHTML="";
            members.get().then(doc => {
                doc.forEach(userdoc => {
                    var name = userdoc.data().name;
                    var namecard = document.createElement("a");
                    // namecard.href = ;
                    namecard.innerText = name;


                    document.getElementById("familymembergoeshere").appendChild(namecard);
                });
            });
        } else {
            console.log("No user is signed in");
        }
    });
}
populateMemberCards();