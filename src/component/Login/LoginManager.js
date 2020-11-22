import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFrameWork = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

// Function for Google Sign In
export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) =>{
        // The signed-in user info.
        const user = result.user;
        return ({
            signedIn: true,
            email: user.email,
            photoUrl: user.photoURL,
             displayName: user.displayName,
            success: "Google Logged In Successfully",
            error: ""
        });
      }).catch((error) => {
        return ({
            signedIn: false,
            email: "",
            photoUrl: "",
            displayName: "",
            success: "",
            error: error.message
        })
})};


// Function for Google Sign Out
export const handleGoogleSignOut = () => {
    return firebase.auth().signOut().then(function() {
        return ({
            signedIn: false,
            email: "",
            photoUrl: "",
            displayName: "",
            success: "",
            error: "",
            logout: "Google Logged Out Successfully"
        })
      }).catch(function(error) {
        // An error happened.
      });
}


export const handleCreateUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        const userInfo = user.user;
        userInfo.signInSuccess = false;
        userInfo.success = true;
        userInfo.error = "";
        userInfo.signInError = "";
        return userInfo;
    })
    .catch((error) => {
        const userInfo = {};
        userInfo.success = false;
        userInfo.signInSuccess = false;
        userInfo.error = error.message;
        userInfo.signInError = "";
       return userInfo;
    });
}

export const handleSignInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        const userInfo = user.user;
        userInfo.success = false;
        userInfo.signInSuccess = true;
        userInfo.error = "";
        userInfo.signInError = "";
        return userInfo;
        
    })
    .catch((error) => {
        const userInfo = {};
        userInfo.signInSuccess = false;
        userInfo.success = false;
        userInfo.error = "";
        userInfo.signInError = error.message;
        return userInfo;
    });
}
