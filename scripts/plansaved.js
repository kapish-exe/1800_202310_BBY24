function readPlan(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            const planRef = currentUser.collection("plan").doc(0);

            planRef.get()
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

