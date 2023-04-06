function populateMemberCards() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("user exists");
            var household = db.collection("household").doc(user.uid);
            var members = household.collection("member");
            console.log(members);
            document.getElementById("member-cards-container").innerHTML="";
            members.get().then(doc => {
                doc.forEach(userdoc => {
                    var name = userdoc.data().name;
                    var namecard = document.createElement("div");
                    namecard.classList.add("member-card");
                    namecard.innerText = name;
            


                    document.getElementById("member-cards-container").appendChild(namecard);
                });
            });
        } else {
            console.log("No user is signed in");
        }
    });
}

populateMemberCards();




const formExpanders = document.querySelectorAll('.form-shower');
formExpanders.forEach(expander => {
  expander.addEventListener('click', () => {
    const nextFormElement = expander.parentNode.nextElementSibling;
    nextFormElement.style.display = nextFormElement.style.display === 'block' ? 'none' : 'block';
    expander.style.display = 'none';
  });
});

let submitMember = document.getElementById("submitNewMember");
let newMember = document.getElementById("householdMemberName");

submitMember.addEventListener('click',()=> {
    if (newMember.value.trim() != ""){
        firebase.auth().onAuthStateChanged((user) => {
            // Check if user is signed in:
            if (user) {

                var household = db.collection("household").doc(user.uid);
                var member = household.collection("member");
                member.add({
                name: newMember.value
                })

                var namecard = document.createElement("div");
                namecard.classList.add("member-card");
                namecard.innerText = newMember.value;
                document.getElementById("member-cards-container").appendChild(namecard);
                newMember.value = "";

            } else {
                // No user is signed in.
                console.log("No user is signed in");
            }
        });
        document.getElementById("householdMembersForm").style.display = 'none';
        document.getElementById("plus-button").style.display = 'flex';
    }

});





