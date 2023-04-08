
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

//read from each subcollection
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
                        var ischecked = doc.data().ischecked ? "checked" : "";
                        var itemName = doc.data().itemName;
                        var itemQ = doc.data().quantity;
                        var itemList = document.getElementById(`${subcollection}-goes-here`);
                        var itemHtml = `
                        <li class="list-group-item border-0 d-flex align-items-center ps-0">
                            <div class="d-flex align-items-center w-100 justify-content-between">
                                <div>
                                    <input class="form-check-input ${itemName}" type="checkbox" aria-label="..." ${ischecked}/>
                                    <label class="card-title">${itemName} - </label>
                                    <label class="card-description">${itemQ}</label>
                                </div>
                                <i class="material-icons" id="delete-icon">delete</i>
                            </div>
                        </li>
              `;
                        itemList.innerHTML += itemHtml;

                    });
                });
            });

        } else {
            console.log("No user is signed in");
        }
    });
}
populateList();

//clearbtn to clear everything
function clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }