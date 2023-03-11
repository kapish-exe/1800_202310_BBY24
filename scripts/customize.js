function submitCustomize() {
    console.log("inside write review")
    let UserSelectPeoNum = document.getElementById('selectPeoNum').value;
    let UserSelectHr = document.getElementById('selectHr').value;
    let UserSelectType = document.querySelector('input[name="selectType"]:checked').value;
    console.log(userSelectPeoNum, userSelectHr, userSelectType);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("customizedKit").add({
                        userID: userID,
                        numberOfPeople: UserSelectPeoNum,
                        numberOfHr: UserSelectHr,
                        typeOfKit: UserSelectType,
                    }).then(() => {
                        window.location.href = "emergencyKit.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'customizedKit.html';
        }
    });
}