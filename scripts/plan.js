function createPlan(
    evacRoute,
    altEvacRoute,
    eKitLocation,
    nearMeetingPoint,
    farMeetingPoint
) {

    firebase.auth().onAuthStateChanged((user) => {
        // Check if user is signed in:
        if (user) {
            const data = {
                evacRoute: evacRoute,
                altEvacRoute: altEvacRoute,
                eKitLocation: eKitLocation,
                nearMeetingPoint: nearMeetingPoint,
                farMeetingPoint: farMeetingPoint,
            };

            db.collection("plans").doc(user.uid).set(data)
                .then(() => {
                    console.log("Plan created");
                    window.location.href="/plansaved.html";
                })
                .catch((error) => {
                    console.error("Error creating plan:", error);
                });
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

var planSubmit = document.getElementById("planSubmit");

var evacRoute = document.getElementById("evacRoute");
var altEvacRoute = document.getElementById("altEvacRoute");
var eKitLocation = document.getElementById("eKitLocation");
var nearMeetingPoint = document.getElementById("nearMeetingPoint");
var farMeetingPoint = document.getElementById("farMeetingPoint");


/* Selects all form expander buttons.
    On click, the form that immediately follows the parent Node (button is wrapped in a <p>)
    is toggled visibility
  */
const formExpanders = document.querySelectorAll('.form-expander');
formExpanders.forEach(expander => {
  expander.addEventListener('click', () => {
    const nextFormElement = expander.parentNode.nextElementSibling;
    nextFormElement.style.display = nextFormElement.style.display === 'block' ? 'none' : 'block';
    expander.textContent = expander.textContent === '-' ? '+' : '-';
  });
});






planSubmit.onclick = function () {
    createPlan(
        evacRoute.value,
        altEvacRoute.value,
        eKitLocation.value,
        nearMeetingPoint.value,
        farMeetingPoint.value,
    );
};