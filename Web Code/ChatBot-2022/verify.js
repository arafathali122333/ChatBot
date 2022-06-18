firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
            setInterval(function() { location.reload(); }, 1000);
            if (user.emailVerified) {
                window.open("BotChat/index.html", "_self");
            }
        }
    } else {

    }
});