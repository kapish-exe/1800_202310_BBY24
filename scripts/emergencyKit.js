// count household member
function populateHouseholdPeo() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var household = db.collection("household").doc(user.uid);
        var members = household.collection("member");
        members.get().then(querySnapshot => {
          var count = querySnapshot.size;
          document.getElementById("peoNum-goes-here").innerText = count;
        })
      } else {
        console.log("No user is signed in");
      }
    });
  }  
populateHouseholdPeo();


//expend the categories
const formExpanders = document.querySelectorAll('.form-expander');
formExpanders.forEach(expander => {
    expander.addEventListener('click', () => {
        const nextFormElement = expander.parentNode.nextElementSibling;
        nextFormElement.style.display = nextFormElement.style.display === 'block' ? 'none' : 'block';
        expander.textContent = expander.textContent === '-' ? '+' : '-';
    });
});


//clearbtn to clear everything
function clearAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.ischecked = false);
    console.log("All checkboxes cleared.");
}  


// savebtn to save checkboxes to database
function saveCheckboxes() {
    alert("Changes saved");
}

//each delete button
function deleteBtn() {
    for (let i = 1; i <= 31; i++) {
        document.getElementById(`c${i}`).ischecked = false;
        db.collection("emergKit").doc(user.uid).update({
            [itemName]: firebase.firestore.FieldValue.delete()
        })
    };
    console.log("delete successfully");
}
// const deleteBtns = document.querySelectorAll('.delete-btn');
// deleteBtns.forEach((deleteBtn) => {
//   deleteBtn.addEventListener("click", () => {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         const emergencyKit = db.collection("emergencyKit").doc(user.uid);
//         const categories = ["foodAndWater", "firstAid", "tools", "shelter"];
//         categories.forEach(category => {
//           const itemsDoc = emergencyKit.collection(category);
//           itemsDoc.get().then(doc => {
//             doc.forEach(userdoc => {
//               if (userdoc.data().itemName === deleteBtn.parentNode.parentNode.id) {
//                 itemsDoc.doc(userdoc.id).delete();
//               }
//             });
//           });
//         });
//       }
//     });
//   });
// });


//additem btn to DB for each
let addItemOfFoodAndWater = document.getElementById("addItemOfFoodAndWater");
addItemOfFoodAndWater.addEventListener('click',()=> {
    let itemName = document.getElementById(`firstAid-itemName`);
    let quantity = document.getElementById(`firstAid-quantity`);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid);
            var firstAid = emergencyKit.collection("firstAid");

            firstAid.add({
                name: itemName.value,
                quantity: quantity.value,
                ischecked: false
                })
        } else {
            console.log("error");
        }
    })
})







//simpifly add btn
function addItem() {
    const categories = ["foodAndWater", "firstAid", "tools", "shelter"];
    categories.forEach(category => {

    const emergencyKit = db.collection("emergencyKit").doc(user.uid);
    const categoryCollection = emergencyKit.collection(category);

    const itemName = document.getElementById(`${category}-itemName`).value;
    const quantity = document.getElementById(`${category}-quantity`).value;
    const itemData = {
        itemName: itemName,
        quantity: quantity,
        ischecked: false
    };

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            categoryCollection.add(itemData)
                .then(() => {
                    console.log(`${itemName} added to ${category}`);
                })
        } else {
            console.log("error");
        }
    })
})}





//create collection "emergencyKit"
function createEmergencyKit() {
            firebase.auth().onAuthStateChanged((user) => {
                const emergencyKit = db.collection("emergencyKit").doc(user.uid);
                const foodAndWater = emergencyKit.collection("foodAndWater");
                const firstAid = emergencyKit.collection("firstAid");
                const tools = emergencyKit.collection("tools");
                const shelter = emergencyKit.collection("shelter")
                //Food & Water
                foodAndWater.add({
                    itemName: "Water",
                    quantity: "4 gallon",
                    ischecked: true
                });
                foodAndWater.add({
                    itemName: "Water Purification Tablets",
                    quantity: "10 tablets",
                    ischecked: true
                });
                foodAndWater.add({
                    itemName: "Cereals",
                    quantity: "3 servings",
                    ischecked: false
                });
                foodAndWater.add({
                    itemName: "Canned foods, specifically canned fruits and vegetables",
                    quantity: "10 servings",
                    ischecked: false
                });
                foodAndWater.add({
                    itemName: "Protein bars",
                    quantity: "3 bars",
                    ischecked: false
                });
                foodAndWater.add({
                    itemName: "Juice",
                    quantity: "3 servings",
                    ischecked: false
                });
                foodAndWater.add({
                    itemName: "Freeze-dried food",
                    quantity: "3 servings",
                    ischecked: false
                });
                foodAndWater.add({
                    itemName: "Non-perishable food",
                    quantity: "3 servings",
                    ischecked: false
                });

                //First Aid
                firstAid.add({
                    itemName: "Vinyl Glove",
                    quantity: "2 pairs",
                    ischecked: true
                });
                firstAid.add({
                    itemName: "Band-Aids",
                    quantity: "36",
                    ischecked: true
                });
                firstAid.add({
                    itemName: "Gauze Pads",
                    quantity: "2",
                    ischecked: false
                });
                firstAid.add({
                    itemName: "Rolled Gauze",
                    quantity: "2",
                    ischecked: false
                });
                firstAid.add({
                    itemName: "Alcohol Pads",
                    quantity: "15",
                    ischecked: false
                });
                firstAid.add({
                    itemName: "Adhesive Tape Roll",
                    quantity: "1",
                    ischecked: false
                });
                firstAid.add({
                    itemName: "Tweezer",
                    quantity: "1",
                    ischecked: false
                });
                firstAid.add({
                    itemName: "Cold Pack",
                    quantity: "15",
                    ischecked: false
                });
                firstAid.add({
                    itemName: "Plastic Carry Case",
                    quantity: "1",
                    ischecked: false
                });

                //Tools
                tools.add({
                    itemName: "Aluminum Alloy Emergency Whistle",
                    quantity: "2 pairs",
                    ischecked: false
                });
                tools.add({
                    itemName: "Dust Masks",
                    quantity: "36",
                    ischecked: false
                });
                tools.add({
                    itemName: "Leather Palm Work Gloves",
                    quantity: "2",
                    ischecked: false
                });
                tools.add({
                    itemName: "Multi-Function Army Knife",
                    quantity: "2",
                    ischecked: false
                });
                tools.add({
                    itemName: "50ft Nylon Utility Cord",
                    quantity: "15",
                    ischecked: false
                });
                tools.add({
                    itemName: "Hand-Crank Powered Light, AM/FM Radio and USB Device Charger",
                    quantity: "1",
                    ischecked: false
                });
                tools.add({
                    itemName: "Emergency Candles",
                    quantity: "1",
                    ischecked: false
                });
                tools.add({
                    itemName: "Waterproof Matches",
                    quantity: "15",
                    ischecked: false
                });
                tools.add({
                    itemName: "Tissue Pack",
                    quantity: "1",
                    ischecked: false
                });
                tools.add({
                    itemName: "Clear Reclosable Bags",
                    quantity: "1",
                    ischecked: false
                });

                //Shelter
                shelter.add({
                    itemName: "Aluminized Sleeping Bag",
                    quantity: "15",
                    ischecked: false
                });
                shelter.add({
                    itemName: "Hooded Rain Poncho",
                    quantity: "1",
                    ischecked: false
                });
                shelter.add({
                    itemName: "Tube Tent",
                    quantity: "1",
                    ischecked: false
                });
                shelter.add({
                    itemName: "Roll Duct Tape",
                    quantity: "1",
                    ischecked: false
                });
            })
    }
createEmergencyKit()

//read from subcollection "foodAndWater"
function populatefoodAndWater() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid);

            //read from subcollection "foodAndWater"
            var itemsDoc = emergencyKit.collection("foodAndWater");
            itemsDoc.get().then(doc => {
                doc.forEach(userdoc => {
                    var ischecked = userdoc.data().ischecked;
                    if (ischecked == true) {
                        ischecked = "checked";
                    } else {
                        ischecked = "";
                    }

                    var itemName = userdoc.data().itemName;
                    var itemList = document.getElementById("foodAndWater-goes-here");
                    const itemHtml = `
                    <li id="${itemName}" class="list-group-item border-0 d-flex align-items-center ps-0">
                        <div class="d-flex align-items-center w-100 justify-content-between">
                            <div>
                            <input id="${itemName}" name="${itemName}" value="${itemName}" 
                                class="form-check-input me-3" type="checkbox" aria-label="..." ${ischecked}/>
                            <label for="${itemName}">${itemName}</label>
                            </div>
                            <div class="input-group" style="width: 130px;">
                            <input class="form-control" value="3 servings">
                            </div>
                            <button class="delete-btn" onclick="deleteBtn()">X</button>
                        </div>
                    </li>
                `;
                    itemList.innerHTML += itemHtml;
                });
            });

            //read from subcollection "firstAid"
            var itemsDoc = emergencyKit.collection("firstAid");
            itemsDoc.get().then(doc => {
                doc.forEach(userdoc => {
                    var ischecked = userdoc.data().ischecked;
                    if (ischecked == true) {
                        ischecked = "checked";
                    } else {
                        ischecked = "";
                    }

                    var itemName = userdoc.data().itemName;

                    var itemList = document.getElementById("firstAid-goes-here");
                    const itemHtml = `
                    <li class="list-group-item border-0 d-flex align-items-center ps-0">
                      <div class="d-flex align-items-center w-100 justify-content-between">
                        <div>
                          <input id="${itemName}" name="${itemName}" value="${itemName}" class="form-check-input me-3" type="checkbox" aria-label="..."/ ${ischecked}>
                          <label for="${itemName}">${itemName}</label>
                        </div>
                        <div class="input-group" style="width: 130px;">
                            <input class="form-control" value="3 servings">
                        </div>
                        <button class="delete-btn" onclick="deleteBtn()">X</button>
                      </div>
                    </li>
                `;
                    itemList.innerHTML += itemHtml;
                });
            });

            //read from subcollection "tools"
            var itemsDoc = emergencyKit.collection("tools");
            itemsDoc.get().then(doc => {
                doc.forEach(userdoc => {
                    var ischecked = userdoc.data().ischecked;
                    if (ischecked == true) {
                        ischecked = "checked";
                    } else {
                        ischecked = "";
                    }

                    var itemName = userdoc.data().itemName;
                    var itemList = document.getElementById("tools-goes-here");
                    const itemHtml = `
                    <li id="${itemName}" class="list-group-item border-0 d-flex align-items-center ps-0">
                        <div class="d-flex align-items-center w-100 justify-content-between">
                            <div>
                            <input id="${itemName}" name="${itemName}" value="${itemName}" 
                                class="form-check-input me-3" type="checkbox" aria-label="..." ${ischecked}/>
                            <label for="${itemName}">${itemName}</label>
                            </div>
                            <div class="input-group" style="width: 130px;">
                            <input class="form-control" value="3 servings">
                            </div>
                            <button class="delete-btn" onclick="deleteBtn()">X</button>
                        </div>
                    </li>
                `;
                    itemList.innerHTML += itemHtml;
                });
            });

            //read from subcollection "shelter"
            var itemsDoc = emergencyKit.collection("shelter");
            itemsDoc.get().then(doc => {
                doc.forEach(userdoc => {
                    var ischecked = userdoc.data().ischecked;
                    if (ischecked == true) {
                        ischecked = "checked";
                    } else {
                        ischecked = "";
                    }

                    var itemName = userdoc.data().itemName;
                    var itemList = document.getElementById("shelter-goes-here");
                    const itemHtml = `
                    <li id="${itemName}" class="list-group-item border-0 d-flex align-items-center ps-0">
                        <div class="d-flex align-items-center w-100 justify-content-between">
                            <div>
                            <input id="${itemName}" name="${itemName}" value="${itemName}" 
                                class="form-check-input me-3" type="checkbox" aria-label="..." ${ischecked}/>
                            <label for="${itemName}">${itemName}</label>
                            </div>
                            <div class="input-group" style="width: 130px;">
                            <input class="form-control" value="3 servings">
                            </div>
                            <button class="delete-btn" onclick="deleteBtn()">X</button>
                        </div>
                    </li>
                `;
                    itemList.innerHTML += itemHtml;
                });
            });

        } else {
            console.log("No user is signed in");
        }
    });
}
populatefoodAndWater();



// function populateEmergencyKit() {
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var emergencyKit = db.collection("emergencyKit").doc(user.uid);
//             const categories = ["foodAndWater", "firstAid", "tools", "shelter"];
//             categories.forEach(category => {
//                 const itemList = document.getElementById(`${category}-goes-here`);
//                 const itemsDoc = emergencyKit.collection(category);
//                 itemsDoc.get().then(doc => {
//                     doc.forEach(userdoc => {
//                         var ischecked = userdoc.data().ischecked
//                         if (ischecked == true) {
//                             ischecked = "checked"
//                         } else {
//                             ischecked = ""
//                         }

//                         var itemName = userdoc.data().itemName;
//                         const itemHtml = `
//                             <li id="${itemName}" class="list-group-item border-0 d-flex align-items-center ps-0">
//                                 <div class="d-flex align-items-center w-100 justify-content-between">
//                                     <div>
//                                     <input id="${itemName}" name="${itemName}" value="${itemName}" 
//                                         class="form-check-input me-3" type="checkbox" aria-label="..." ${ischecked}"/>
//                                     <label for="${itemName}">${itemName}</label>
//                                     </div>
//                                     <div class="input-group" style="width: 130px;">
//                                     <input class="form-control" value="3 servings">
//                                     </div>
//                                     <button class="delete-btn" onclick="deleteBtn()">X</button>
//                                 </div>
//                             </li>
//                         `;
//                         itemList.innerHTML += itemHtml;
//                     });
//                 });
//             });
//         } else {
//             console.log("No user is signed in");
//         }
//     });
// }
// populateEmergencyKit();


// update the ischecked status
// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", () => {
//         firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 const emergencyKit = db.collection("emergencyKit").doc(user.uid);
//                 const categories = ["foodAndWater", "firstAid", "tools", "shelter"];
//                 categories.forEach(category => {
//                     const itemsDoc = emergencyKit.collection(category);
//                     itemsDoc.get().then(doc => {
//                         doc.forEach(userdoc => {
//                             if (userdoc.data().itemName === checkbox.id) {
//                                 itemsDoc.doc(userdoc.id).update({ ischecked: checkbox.checked });
//                             }
//                         });
//                     });
//                 });
//             }
//         });
//     });
// });

    



    



    










// //list version2
// //build default list in HTML --> collection "emergeKit"
// const checkbox = [];
// for (var i = 1; i <= 31; i++) {
//     checkbox[i] = document.getElementById(`checkbox${i}`);
//     console.log(checkbox[i]);
// }
// for (var i = 1; i <= 31; i++) {
//     checkbox[i].addEventListener("change", updateDB);
// }
// function updateDB() {
//     const checkboxName = this.name;
//     const checkboxValue = this.value;
//     const isisChecked = this.ischecked;
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             db.collection("emergKit").doc(user.uid)
//                 .set({
//                     [checkboxName]: {
//                         name: checkboxValue,
//                         ischecked: isisChecked,
//                     },
//                 }, { merge: true })
//                 .then(() => {
//                     console.log("emergKit setting done");
//                 })
//         } else {
//             console.log("error");
//         }
//     })
// }
// //ischecked status to DB
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         db.collection("emergeKit").doc(user.uid).onSnapshot((doc) => {
//             if (doc.exists) {
//                 const data = doc.data();
//                 for (var i = 1; i <= 31; i++) {
//                     if (data.checkbox[i]) {
//                         checkbox[i].ischecked = data.checkbox[i].ischecked;
//                     }
//                 }
//             } else {
//                 console.log("error");
//             }
//         })
//     }
// })













// 1. update checkbox status
// 2. add new item
// 3. delete the item










