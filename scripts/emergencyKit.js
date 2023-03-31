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
function clearCustomize() {
    for (let i = 1; i <= 31; i++) {
        document.getElementById(`c${i}`).checked = false;
    };
    console.log("checkboxes all clear");
}

// savebtn to save checkboxes to database
function saveCheckboxes() {
    alert("changes saved");
}






//list version1
//build defaul list(c1~c8) in authentication --> collection "emergencyKit"
//read default emergencykit data from DB, innertext in "testtext"
function readDefaultKit() {
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
readDefaultKit();





//list version2
//build default list(c1~c8) in HTML --> collection "emergeKit"
const checkbox = [];
for (var i = 1; i <= 8; i++) {
    checkbox[i] = document.getElementById(`checkbox${i}`);
    console.log(checkbox[i]);
}
for (var i = 1; i <= 8; i++) {
    checkbox[i].addEventListener("change", updateDB);
}
function updateDB() {
    const checkboxName = this.name;
    const checkboxValue = this.value;
    const isChecked = this.checked;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("emergKit").doc(user.uid)
                .set({
                    [checkboxName]: {
                        name: checkboxValue,
                        checked: isChecked,
                    },
                }, { merge: true })
                .then(() => {
                    console.log("emergKit setting done");
                })
        } else {
            console.log("error");
        }
    })
}

//checked status to DB
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection("emergeKit").doc(user.uid).onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                for (var i = 1; i <= 8; i++) {
                    if (data.checkbox[i]) {
                        checkbox[i].checked = data.checkbox[i].checked;
                    }
                }
            } else {
                console.log("error");
            }
        })
    }
})

//read new item from DB then show on HTML
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection("emergKit").doc(user.uid).onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const itemList = document.getElementById("itemList");
                itemList.innerHTML = " "; // clear previous items
                for (const itemName in data) {
                    if (itemName !== "emergKitTitle") {
                        const itemData = data[itemName];
                        const itemHtml = `
                <li class="list-group-item border-0 d-flex align-items-center ps-0">
                  <input id="${itemName}" class="form-check-input me-3" type="checkbox" aria-label="..." ${itemData.checked ? "checked" : ""}>
                  ${itemData.name}
                </li>
              `;
                        itemList.innerHTML += itemHtml;
                    }
                }
            } else {
                console.log("error");
            }
        })
    }
})



//additem btn to DB
function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemData = {
        name: itemName,
        checked: false
    };
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("emergKit").doc(user.uid)
                .set({
                    [itemName]: itemData
                }, { merge: true })
                .then(() => {
                    console.log(`${itemName} added to emergKit`);
                })
        } else {
            console.log("error");
        }
    })
}






