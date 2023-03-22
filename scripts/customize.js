function submitCustomize() {
    var selectPeoNum = document.getElementById('selectPeoNum').value;
    var selectHr = document.getElementById('selectHr').value;
    var selectType = document.querySelector('input[name="selectType"]:checked').value
    console.log(selectPeoNum, selectHr, selectType);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("customizeKit").doc(user.uid).set({
                userID: user.uid,
                selectPeoNum: selectPeoNum,
                selectHr: selectHr,
                selectType: selectType,
            }).then(() => {
                console.log("Customized kit created");
                // window.location.href = "emergencyKit.html";
            }).catch((error) => {
                console.error("Error creating customized kit:", error);
            });
        } else {
            console.log("No user is signed in");
        }
    });
}

