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
          
        }).catch(function (error) {
          console.log("Error adding new user: " + error);
        });





        
        //Create Household initally with one member
        var household = db.collection("household").doc(user.uid);
        var member = household.collection("member");
        member.add({
          name: user.displayName
        });

        var emergencyKit = db.collection("emergencyKit").doc(user.uid);
        var foodAndWater = emergencyKit.collection("foodAndWater");
        var firstAid = emergencyKit.collection("firstAid");
        var tools = emergencyKit.collection("tools");
        var shelter = emergencyKit.collection("shelter")
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

        db.collection("userDocs").doc(user.uid).set({

        }).then(function () {
          console.log(" user docs table to firestore");
          window.location.assign("setup.html");   

        }).catch(function (error) {
          console.log("Error adding user docs: " + error);
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


