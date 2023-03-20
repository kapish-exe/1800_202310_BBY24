function createPlan(evacRoute, altEvacRoute, eKitLocation, 
    nearMeetingPoint, farMeetingPoint){
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            const planRef = currentUser.collection("plan").doc();

            const data = {
                evacRoute: evacRoute,
                altEvacRoute: altEvacRoute,
                eKitLocation: eKitLocation,
                nearMeetingPoint: nearMeetingPoint,
                farMeetingPoint: farMeetingPoint
            };

            planRef.set(data).then(()=> {
                console.log('Plan created');
            })
            .catch((error)=> {
                console.error("Error creatingplan:", error);
            });


        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }

    }) 


}



var planSubmit = document.getElementById("planSubmit");
var evacRoute = document.getElementById("evacRoute").value;
var altEvacRoute = document.getElementById("altEvacRoute").value;
var eKitLocation = document.getElementById("eKitLocation").value;
var nearMeetingPoint = document.getElementById("nearMeetingPoint").value;
var farMeetingPoint = document.getElementById("farMeetingPoint").value;

planSubmit.onclick = function() {createPlan(evacRoute, altEvacRoute, eKitLocation, 
    nearMeetingPoint, farMeetingPoint)};



