const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = "index.html"; // Redirect the user to the sign-in page
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
});
