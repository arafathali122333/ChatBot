var firebaseConfig = {
    apiKey: "AIzaSyADxqHtdT-9u3Ay3shemAcjrM4UlLAwgK4",
    authDomain: "chatbot-5eb90.firebaseapp.com",
    databaseURL: "https://chatbot-5eb90-default-rtdb.firebaseio.com",
    projectId: "chatbot-5eb90",
    storageBucket: "chatbot-5eb90.appspot.com",
    messagingSenderId: "717612038808",
    appId: "1:717612038808:web:036a0549f46c672d462eed"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user !== null) {
        if (user.emailVerified) {

        } else {
            alert("Hey User Email id:" + user.email + " isn't verified! Please check your mail and click verification link");
            firebase.auth().signOut().then(function() {
                window.open("/LogIn.html", "_self");
            });
        }
    } else {
        window.open("/LogIn.html", "_self");
    }
});