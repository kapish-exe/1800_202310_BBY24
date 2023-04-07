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


function populateMemberCards() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("user exists");
            var household = db.collection("household").doc(user.uid);
            var members = household.collection("member");
            console.log(members);
            document.getElementById("member-cards-container").innerHTML="";
            members.get().then(doc => {
                doc.forEach(userdoc => {
                    var name = userdoc.data().name;
                    var namecard = document.createElement("div");
                    namecard.classList.add("member-card");
                    namecard.innerText = name;
 
                    document.getElementById("member-cards-container").appendChild(namecard);
                });
            });
        } else {
            console.log("No user is signed in");
        }
    });
}

populateMemberCards();




const formShowers = document.querySelectorAll('.form-shower');
formShowers.forEach(expander => {
  expander.addEventListener('click', () => {
    const nextFormElement = expander.parentNode.nextElementSibling;
    nextFormElement.style.display = nextFormElement.style.display === 'block' ? 'none' : 'block';
    expander.style.display = 'none';
  });
});

let submitMember = document.getElementById("submitNewMember");
let newMember = document.getElementById("householdMemberName");

submitMember.addEventListener('click',()=> {
    if (newMember.value.trim() != ""){
        firebase.auth().onAuthStateChanged((user) => {
            // Check if user is signed in:
            if (user) {

                var household = db.collection("household").doc(user.uid);
                var member = household.collection("member");
                member.add({
                name: newMember.value
                })

                var namecard = document.createElement("div");
                namecard.classList.add("member-card");
                namecard.innerText = newMember.value;
                document.getElementById("member-cards-container").appendChild(namecard);
                newMember.value = "";

            } else {
                // No user is signed in.
                console.log("No user is signed in");
            }
        });
        document.getElementById("householdMembersForm").style.display = 'none';
        document.getElementById("plus-button").style.display = 'flex';
    }

});

