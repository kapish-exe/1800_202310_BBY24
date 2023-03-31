// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;                            // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {         //if new user
        db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
          username: user.displayName,                    //"users" collection
          email: user.email,
          bio: "Stay safe",                       //with authenticated user's ID (user.uid)
          location: "Canada",
          //optional default profile info      

        }).then(function () {
          console.log("New user added to firestore");
          window.location.assign("setup.html");       //re-direct to setup.html after signup
        }).catch(function (error) {
          console.log("Error adding new user: " + error);
        });

        db.collection("userDocs").doc(user.uid).set({

        }).then(function () {
          console.log(" user docs table to firestore");
          
        }).catch(function (error) {
          console.log("Error adding user docs: " + error);
        });

        //Create Household initally with one member
        var household = db.collection("household").doc(user.uid);
        var member = household.collection("member");
        member.add({
          name: user.displayName
        })


        // Create default Emergency Kit for User
        var emergencyKit = db.collection("emergencyKit").doc(user.uid);
        var items = emergencyKit.collection("items");
        items.add({
          code: "c1",
          name: "water",
          quantity: "4 gallon"
        });
        items.add({
          code: "c2",
          name: "Water Purification Tablets",
          quantity: "10 tablets"
        });
        items.add({
          code: "c3",
          name: "Cereals",
          quantity: "3 servings"
        });
        items.add({
          code: "c4",
          name: "Canned foods, specifically canned fruits and vegetables",
          quantity: "10 servings"
        });
        items.add({
          code: "c5",
          name: "Protein bars",
          quantity: "3 bars"
        });
        items.add({
          code: "c6",
          name: "Juice",
          quantity: "3 servings"
        });
        items.add({
          code: "c7",
          name: "Freeze-dried food",
          quantity: "3 servings"
        });
        items.add({
          code: "c8",
          name: "Non-perishable food",
          quantity: "3 servings"
        });

      } else {
        return true;
      }
      return false;
    },


    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: "main.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);


