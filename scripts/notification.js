
const securityAlertsCheck1 = document.getElementById('customCheck1');
const securityAlertsCheck2 = document.getElementById('customCheck2');
const commentsCheck = document.getElementById('customSwitch1');
const updatesFromPeopleCheck = document.getElementById('customSwitch2');
const remindersCheck = document.getElementById('customSwitch3');
const eventsCheck = document.getElementById('customSwitch4');

//
securityAlertsCheck1.addEventListener("change", updateFirestore);
securityAlertsCheck2.addEventListener("change", updateFirestore);
commentsCheck.addEventListener("change", updateFirestore);
updatesFromPeopleCheck.addEventListener("change", updateFirestore);
remindersCheck.addEventListener("change", updateFirestore);
eventsCheck.addEventListener("change", updateFirestore);

//update the firestore
function updateFirestore() {
    const checkboxName = this.name;
    const checkboxValue = this.value;
    const isChecked = this.checked;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("notification").doc(user.uid)
                .set({
                    [checkboxName]: {
                        value: checkboxValue,
                        checked: isChecked,
                    },
                }, { merge: true })

                .then(() => {
                   console.log("notification setting done");
                    // var docid = doc.id;
                })
        } else {
            // No user is signed in.
            console.log("Error, no user signed in");
        }
    });
};

firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
        db.collection("notification").doc(user.uid).onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                if (data.customCheck1) {
                    securityAlertsCheck1.checked = data.customCheck1.checked;
                }
                if (data.customCheck2) {
                    securityAlertsCheck2.checked = data.customCheck1.checked;
                }
                if (data.customSwitch1) {
                    commentsCheck.checked = data.customSwitch1.checked;
                }
                if (data.customSwitch2) {
                    updatesFromPeopleCheck.checked = data.customSwitch2.checked;
                }
                if (data.customSwitch3) {
                    remindersCheck.checked = data.customSwitch3.checked;
                }
                if (data.customSwitch4) {
                    eventsCheck.checked = data.customSwitch4.checked;
                }
            } else {
                console.log("error");
            }
        })
    }
});

// const saveBtn = document.getElementById("save-btn");
// saveBtn.addEventListener("click", () => {
//   alert("Changes saved.");
// });




