
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.classList.contains('form-check-input')) {
                    const input = node;
                    input.addEventListener('change', updateCheckboxes);
                }
            });
        }
    });
});

observer.observe(document, { childList: true, subtree: true });

// Apply event listener to existing form check inputs
const formCheckInputs = document.querySelectorAll('.form-check-input');
formCheckInputs.forEach((input) => {
    input.addEventListener('change', updateCheckboxes);
});


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
        const nextFormElement = expander.nextElementSibling;
        nextFormElement.style.display = nextFormElement.style.display === 'block' ? 'none' : 'block';

    });
});


// //clearbtn to clear everything
// function clearAllCheckboxes() {
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     checkboxes.forEach(checkbox => checkbox.ischecked = false);
//     console.log("All checkboxes cleared.");
// }


// // savebtn to save checkboxes to database
// function saveCheckboxes() {
//     alert("Changes saved");
// }

//additem to DB for each
function addItemFW() {
    let itemName = document.getElementById(`foodAndWater-itemName`);
    let quantity = document.getElementById(`foodAndWater-quantity`);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid).collection("items");

            emergencyKit.add({
                itemName: itemName.value,
                quantity: quantity.value,
                ischecked: false,
                category: "foodAndWater"
            }).then(function (docRef) {
                console.log("Item added successfully.");
                //alert("Item added successfully.");
                itemName.value = '';
                quantity.value = '';
                populateList();
            }).catch(function (error) {
                console.log("Error adding item: ", error);
            });
        } else {
            console.log("error");
        }
    })
}
function addItemFA() {
    let itemName = document.getElementById(`firstAid-itemName`);
    let quantity = document.getElementById(`firstAid-quantity`);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid).collection("items");

            emergencyKit.add({
                itemName: itemName.value,
                quantity: quantity.value,
                ischecked: false,
                category: "firstAid"
            }).then(function (docRef) {
                console.log("Item added successfully.");
                alert("Item added successfully.");
                itemName.value = '';
                quantity.value = '';
                populateList();
            }).catch(function (error) {
                console.log("Error adding item: ", error);
            });
        } else {
            console.log("error");
        }
    })
}
function addItemTools() {
    let itemName = document.getElementById(`tools-itemName`);
    let quantity = document.getElementById(`tools-quantity`);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid).collection("items");

            emergencyKit.add({
                itemName: itemName.value,
                quantity: quantity.value,
                ischecked: false,
                category: "tools"
            }).then(function (docRef) {
                console.log("Item added successfully.");
                alert("Item added successfully.");
                itemName.value = '';
                quantity.value = '';
                populateList();
            }).catch(function (error) {
                console.log("Error adding item: ", error);
            });
        } else {
            console.log("error");
        }
    })
}
function addItemShelter() {
    let itemName = document.getElementById(`shelter-itemName`);
    let quantity = document.getElementById(`shelter-quantity`);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid).collection("items");

            emergencyKit.add({
                itemName: itemName.value,
                quantity: quantity.value,
                ischecked: false,
                category: "shelter"
            }).then(function (docRef) {
                console.log("Item added successfully.");
                alert("Item added successfully.");
                itemName.value = '';
                quantity.value = '';
                populateList();
            }).catch(function (error) {
                console.log("Error adding item: ", error);
            });
        } else {
            console.log("error");
        }
    })
}

// //read from each subcollection
// function populateList() {

//     var subcollections = ["foodAndWater", "firstAid", "tools", "shelter"];
//     subcollections.forEach(subcollection => {
//         document.getElementById(`${subcollection}-goes-here`).innerHTML = "";
//     });

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var emergencyKit = db.collection("emergencyKit").doc(user.uid).collection("items");

//             // Loop through subcollections and populate their items
//             var subcollections = ["foodAndWater", "firstAid", "tools", "shelter"];
//             subcollections.forEach(subcollection => {
//                 const itemsDoc = emergencyKit.where("category", "==", subcollection);;
//                 itemsDoc.get().then(snapshot => {
//                     snapshot.forEach(doc => {
//                         var ischecked = doc.data().ischecked ? "checked" : "";
//                         var itemName = doc.data().itemName;
//                         var itemQ = doc.data().quantity;
//                         var itemList = document.getElementById(`${subcollection}-goes-here`);
//                         var itemHtml = `
                        // <li class="list-group-item border-0 d-flex align-items-center ps-0">
                        //     <div class="d-flex align-items-center w-100 justify-content-between">
                        //         <div>
                        //             <input class="form-check-input" type="checkbox" aria-label="..." ${ischecked}/>
                        //             <label class="card-title">${itemName} - </label>
                        //             <label class="card-description">${itemQ}</label>
                        //         </div>
                                
                        //         <i class="material-icons" id="delete-icon">delete</i>
                        //     </div>
                        // </li>
//               `;
//                         itemList.innerHTML += itemHtml;


//                         //update checkbox version 1: error - only change first item of each categories
//                         // const checkbox = document.getElementById(`checkbox-${itemName}`);
//                         // checkbox.addEventListener('change', (event) => {
//                         //     const isChecked = event.target.checked;
//                         //     console.log(`Checkbox for ${itemName} changed: ${isChecked}`);
//                         //     emergencyKit.collection(subcollection).doc(doc.id).update({ ischecked: isChecked });
//                         // });

//                         //update checkbox version 2: error - change all the items
//                         // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//                         // checkboxes.forEach(checkbox => {
//                         //     checkbox.addEventListener('change', (event) => {
//                         //         const isChecked = event.target.checked;
//                         //         console.log(`Checkbox for ${itemName} changed: ${isChecked}`);
//                         //         emergencyKit.collection(subcollection).doc(doc.id).update({ ischecked: isChecked });
//                         //     });
//                         // });





//                     });
//                 });
//             });

//         } else {
//             console.log("No user is signed in");
//         }
//     });
// }
// populateList();



// const deleteBtn = document.querySelectorAll('.delete-btn');
// deleteBtn.forEach(deleteItem => {
//     deleteItem.addEventListener('click',
//         function deleteItem(button) {
//             const itemName = button.name;
//             console.log("called delete funtion");
//             console.log(itemName);

//             firebase.auth().onAuthStateChanged(user => {
//                 if (user) {
//                     db.collection("emergencyKit").doc(user.uid).collection("items")
//                         .where("itemName", "==", itemName)
//                         .get()
//                         .then(snapshot => {
//                             snapshot.forEach(doc => {
//                                 console.log("attempt");
//                                 querySnapshot.forEach((doc) => {
//                                     doc.ref.delete();
//                                 });
//                             })
//                         })
//                         .catch((error) => {
//                             console.error("Error deleting item:", error);
//                         });
//                 } else {
//                     console.log("No user is signed in");
//                 }
//             });
//         })
// })



















function populateList() {
    var subcollections = ["foodAndWater", "firstAid", "tools", "shelter"];
    subcollections.forEach(subcollection => {
        document.getElementById(`${subcollection}-goes-here`).innerHTML = "";
    });

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid).collection("items");

            // Loop through subcollections and populate their items
            var subcollections = ["foodAndWater", "firstAid", "tools", "shelter"];
            subcollections.forEach(subcollection => {
                const itemsDoc = emergencyKit.where("category", "==", subcollection);;
                itemsDoc.get().then(snapshot => {
                    snapshot.forEach(doc => {
                        // var ischecked = doc.data().ischecked ? "checked" : "";
                        var itemName = doc.data().itemName;
                        var itemQ = doc.data().quantity;
                        let newcard = document.getElementById("itemTemplate").content.cloneNode(true);             

                        newcard.querySelector('.card-title').innerHTML = itemName;
                        newcard.querySelector('.card-description').innerHTML = itemQ;

                        //append to the posts
                        document.getElementById(`${subcollection}-goes-here`).append(newcard);     

                        newcard.querySelector('#delete-icon').onclick = () => deletePost(doc.id);    
                    })
                })
            })
        }
    })
}
populateList();



function deleteItem(itemId) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var emergencyKit = db.collection("emergencyKit").doc(user.uid).collection("items");

            emergencyKit.doc(itemId).delete().then(function () {
                console.log("Item deleted successfully.");
                alert("Item deleted successfully.");
                populateList();
            }).catch(function (error) {
                console.error("Error deleting item: ", error);
            });
        } else {
            console.log("error");
        }
    });
}
















// //update checkboxes
// function updateCheckboxes() {
//     console.log("CLICK");
//     alert("CLICK");
//     const checkboxName = this.name;
//     const checkboxValue = this.value;
//     const checked = this.checked;
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             const itemsRef = db.collection("emergencyKit").doc(user.uid).collection("items");
//             itemsRef.where("itemName", "==", checkboxName)
//             get().then(querySnapshot => {
//                 querySnapshot.forEach(doc => {
//                   itemsRef.doc(doc.id).update({
//                     ischecked: checked
//                   });
//                 });
//               });
//         } else {
//             // No user is signed in.
//             console.log("Error, no user signed in");
//         }
//     });
// };











// const itemsRef = db.collection("emergencyKit").doc(user.uid).collection("items");

// const checkboxes = document.querySelectorAll('form input[type="checkbox"]');
// checkboxes.forEach(checkbox => {
//   checkbox.addEventListener('change', (event) => {
//     console.log("clicck");
//     const checkboxName = checkbox.name;
//     const ischecked = checkbox.checked;
//     itemsRef.where("checkboxName", "==", checkboxName).get().then(querySnapshot => {
//       querySnapshot.forEach(doc => {
//         itemsRef.doc(doc.id).update({
//           ischecked: ischecked
//         });
//       });
//     });
//   });
// });




//////////////////////////////////////////////////////////////////////////////////////////////////////////
//delete button: error - not working properly
// const deleteBtn = document.querySelectorAll('.delete-btn');
// deleteBtn.forEach(deleteItem => {
//     deleteItem.addEventListener('click', () => {
//         const docId = deleteBtn.dataset.docId;
//         firebase.auth().onAuthStateChanged(function (user) {
//             if (user) {
//                 var emergencyKit = db.collection("emergencyKit").doc(user.uid);
//                 var foodAndWater = emergencyKit.collection("foodAndWater");
//                 foodAndWater.doc(docId).delete()
//                     .then(() => {
//                         console.log("Document successfully deleted!");
//                     })
//                     .catch(error => {
//                         console.error("Error removing document: ", error);
//                     });
//             }
//         })
//     })
// })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update the ischecked status -- super ooooold version

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
//     const checkboxValue = this.value;
//     const ischecked = this.ischecked;
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             const emergencyKit = db.collection("emergencyKit").doc(user.uid);
//             const subcollections = ["foodAndWater", "firstAid", "tools", "shelter"];
//             subcollections.forEach(subcollection => {
//                 emergencyKit.collection(subcollection)
//                     .doc(checkboxValue)
//                 itemDoc.set({
//                     itemName: checkboxValue,
//                     quantity: "2",
//                     ischecked: ischecked
//                 }, { merge: true })
//                     .then(() => {
//                         console.log("emergKit setting done");
//                     })
//             })
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










