//read selectPeoNum from database, and show in the page
// function readHouseholdPeo() {
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var customizeKitDoc = db.collection("customizeKit").doc(user.uid)
//             customizeKitDoc.get()
//                 .then(userDoc => {
//                     var peopleNum = userDoc.data().selectPeoNum;
//                     document.getElementById("selectPeoNum-goes-here").innerText = peopleNum;
//                 })
//         } else {
//             console.log("No user is signed in");
//         }
//     });
// }
// readHouseholdPeo();


//clearbtn to clear everything
function clearCustomize() {
    for (let i = 1; i <= 31; i++) {
        document.getElementById(`c${i}`).checked = false;
    };
    console.log("checkboxes all clear");
}


//savebtn to save checkboxes to database
// function saveCheckboxes() {
//     var checkboxC = [];
//     for (var i = 1; i <= 31; i++) {
//         if (document.getElementById(`c${i}`).checked == true) {
//             checkboxC[i] = true;
//         } else {
//             checkboxC[i] = false;
//         }
//         console.log(checkboxC[i]);
//     }
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             db.collection("clasicKitCheckboxes").doc(user.uid).set({
//                 userID: user.uid,
//                 checkboxC1: checkboxC[1],
//                 checkboxC2: checkboxC[2],
//                 checkboxC3: checkboxC[3],
//                 checkboxC4: checkboxC[4],
//                 checkboxC5: checkboxC[5],
//                 checkboxC6: checkboxC[6],
//                 checkboxC7: checkboxC[7],
//                 checkboxC8: checkboxC[8],
//                 checkboxC9: checkboxC[9],
//                 checkboxC10: checkboxC[10],
//                 checkboxC11: checkboxC[11],
//                 checkboxC12: checkboxC[12],
//                 checkboxC13: checkboxC[13],
//                 checkboxC14: checkboxC[14],
//                 checkboxC15: checkboxC[15],
//                 checkboxC16: checkboxC[16],
//                 checkboxC17: checkboxC[17],
//                 checkboxC18: checkboxC[18],
//                 checkboxC19: checkboxC[19],
//                 checkboxC20: checkboxC[20],
//                 checkboxC21: checkboxC[21],
//                 checkboxC22: checkboxC[22],
//                 checkboxC23: checkboxC[23],
//                 checkboxC24: checkboxC[24],
//                 checkboxC25: checkboxC[25],
//                 checkboxC26: checkboxC[26],
//                 checkboxC27: checkboxC[27],
//                 checkboxC28: checkboxC[28],
//                 checkboxC29: checkboxC[29],
//                 checkboxC30: checkboxC[30],
//                 checkboxC31: checkboxC[31],
//             }).then(() => {
//                 console.log("clasicKitCheckboxes on DB created");
//                 window.location.href = "emergencyKit.html";
//             }).catch((error) => {
//                 console.error("Error creating clasicKitCheckboxes on DB:", error);
//             });
//         } else {
//             console.log("No user is signed in");
//         }
//     });
// };


//hard code items data for HTML
// function writeEmergencyKit() {
//     var emergencyKit = db.collection("emergKit");
//     var items = emergencyKit.collection("items");
//     emergencyKit.add({
//         code: "c1",
//         name: "water",
//         quantity: "4 gallon"
//     });
//     emergencyKit.add({
//         code: "c2",
//         name: "Water Purification Tablets",
//         quantity: "10 tablets"
//     });
//     emergencyKit.add({
//         code: "c3",
//         name: "Cereals",
//         quantity: "3 servings"
//     });
//     emergencyKit.add({
//         code: "c4",
//         name: "Canned foods, specifically canned fruits and vegetables",
//         quantity: "10 servings"
//     });
//     emergencyKit.add({
//         code: "c5",
//         name: "Protein bars",
//         quantity: "3 bars"
//     });
//     emergencyKit.add({
//         code: "c6",
//         name: "Juice",
//         quantity: "3 servings"
//     });
//     emergencyKit.add({
//         code: "c7",
//         name: "Freeze-dried food",
//         quantity: "3 servings"
//     });
//     emergencyKit.add({
//         code: "c8",
//         name: "Non-perishable food",
//         quantity: "3 servings"
//     });
// }
// writeEmergencyKit()


//read default emergencykit data from DB
function readdefaultKit() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid);
            var itemsDoc = emergencyKit.collection("items");

            itemsDoc.get().then(doc => {
                doc.forEach(uesrdoc => {
                    var items = uesrdoc.data().name;
                    var li = document.createElement("li");
                    li.innerText = items;
                    document.getElementById("items-goes-here").appendChild(li);
                });
            });
        } else {
            console.log("No user is signed in");
        }
    });
}
readdefaultKit();



function saveCheckboxes() {
    //(string) itemName
    itemName = document.getElementById('test').value;

    //(boolean) status
    if (document.getElementById(`test`).checked == true) {
        status = true;
    } else {
        status = false;
    }
    console.log(status);
}




