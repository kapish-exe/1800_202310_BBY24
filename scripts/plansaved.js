function readPlan(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            db.collection("plan").doc(user.uid).get()
                .then( userDoc => {
                    //get the data fields of the user
                    document.getElementById("evacRoute").innerHTML = userDoc.data().evacRoute;
                    document.getElementById("altEvacRoute").innerHTML = userDoc.data().altEvacRoute ;
                    document.getElementById("eKitLocation").innerHTML = userDoc.data().eKitLocation;
                    document.getElementById("nearMeetingPoint").innerHTML = userDoc.data().nearMeetingPoint;
                    document.getElementById("farMeetingPoint").innerHTML = userDoc.data().farMeetingPoint;

                })
        } else {
                        // No user is signed in.
                        console.log ("No user is signed in");
        }

    });
}

readPlan();

