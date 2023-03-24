//submitbtn to store info to DB
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
                console.log("customizedkit on DB created");
                // window.location.href = "emergencyKit.html";
            }).catch((error) => {
                console.error("Error creating customizedkit on DB:", error);
            });
        } else {
            console.log("No user is signed in");
        }
    });
};


//resetbutton to reset default
function resetCustomize() {
        const selectPeoNum = document.getElementById('selectPeoNum');
        selectPeoNum.selectedIndex = 0;

        const selectHr = document.getElementById('selectHr');
        selectHr.selectedIndex = 0;

        document.getElementById("type1").checked = true;
        document.getElementById("type2").checked = false;
        document.getElementById("type3").checked = false;
        document.getElementById("type4").checked = false;
}




