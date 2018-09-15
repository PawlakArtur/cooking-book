import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD0g1U-vlS6dYcWbogjbOtFzglFdgY14EY",
    authDomain: "cooking-book-b938a.firebaseapp.com",
    databaseURL: "https://cooking-book-b938a.firebaseio.com",
    projectId: "cooking-book-b938a",
    storageBucket: "cooking-book-b938a.appspot.com",
    messagingSenderId: "674061107100"   
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};
