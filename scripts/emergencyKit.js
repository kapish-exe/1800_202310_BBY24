var currentUser;

function readcustomizeKit() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
           var customizeKitDoc =  db.collection("customizeKit").doc(user.uid)
          

            customizeKitDoc.get()
            .then(userDoc => {
                var peopleNum = userDoc.data().selectPeoNum;
               
                document.getElementById("selectPeoNum-goes-here").innerText = peopleNum ;
              })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

readcustomizeKit();        //calling the function





//savebtn to save checkboxes to database
function saveCheckboxes() {
    var checkboxC = [];
    for (var i = 1; i <= 31; i++) {
        if (document.getElementById(`c${i}`).checked == true) {
            checkboxC[i] = true;
        } else {
            checkboxC[i] = false;
        }
        console.log(checkboxC[i]);
    }
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("clasicKitCheckboxes").doc(user.uid).set({
                userID: user.uid,
                checkboxC1: checkboxC[1],
                checkboxC2: checkboxC[2],
                checkboxC3: checkboxC[3],
                checkboxC4: checkboxC[4],
                checkboxC5: checkboxC[5],
                checkboxC6: checkboxC[6],
                checkboxC7: checkboxC[7],
                checkboxC8: checkboxC[8],
                checkboxC9: checkboxC[9],
                checkboxC10: checkboxC[10],
                checkboxC11: checkboxC[11],
                checkboxC12: checkboxC[12],
                checkboxC13: checkboxC[13],
                checkboxC14: checkboxC[14],
                checkboxC15: checkboxC[15],
                checkboxC16: checkboxC[16],
                checkboxC17: checkboxC[17],
                checkboxC18: checkboxC[18],
                checkboxC19: checkboxC[19],
                checkboxC20: checkboxC[20],
                checkboxC21: checkboxC[21],
                checkboxC22: checkboxC[22],
                checkboxC23: checkboxC[23],
                checkboxC24: checkboxC[24],
                checkboxC25: checkboxC[25],
                checkboxC26: checkboxC[26],
                checkboxC27: checkboxC[27],
                checkboxC28: checkboxC[28],
                checkboxC29: checkboxC[29],
                checkboxC30: checkboxC[30],
                checkboxC31: checkboxC[31],
            }).then(() => {
                console.log("clasicKitCheckboxes on DB created");
                window.location.href = "emergencyKit.html";
            }).catch((error) => {
                console.error("Error creating clasicKitCheckboxes on DB:", error);
            });
        } else {
            console.log("No user is signed in");
        }
    });
};

//clearbtn to clear everything
function clearCustomize() {
    for (let i = 1; i <= 31; i++) {
        document.getElementById(`c${i}`).checked = false;
    };
    console.log("checkboxes all clear");
}
