firebase.auth().onAuthStateChanged(function(user) {
    if (user !== null) {
        if (user.emailVerified) {
            window.open("BotChat/index.html", "_self");
        } else {
            alert("Hey User Email id:" + user.email + " isn't verified! Please check your mail and click verification link");
            firebase.auth().signOut().then(function() {
                window.open("LogIn.html", "_self");
            });
        }
    } else {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("loginformdetails").style.display = "block";
    }
});

function ForgotPassword() {
    document.getElementById("loginbtn").style.display = "none";
    document.getElementById("resetbtn").style.display = "inline-block";
    document.getElementById("pw").style.display = "none";
    document.getElementById("fp").style.display = "none";
    document.getElementById("title").innerHTML = `<div class="title" style="font-size:18.5px; padding-bottom:14px;"><b>Reset Password ⚠️</b>&ensp;</div>`;
    document.getElementById("notregister").style.display = "none";
    document.getElementById("notreset").style.display = "block";
}

function login() {
    var userEmail = document.getElementById("email_field").value,
        userPass = document.getElementById("password_field").value;
    document.getElementById("loginbtn").innerHTML = "Please Wait...";
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
        window.open("BotChat/index.html", "_self");
    }).catch(function(error) {
        window.alert(error.message);
        document.getElementById("loginbtn").innerHTML = "Sign In";
    });
}

function reset() {
    var userEmail = document.getElementById("email_field").value;
    document.getElementById("resetbtn").innerHTML = "Please Wait...";
    firebase.auth().sendPasswordResetEmail(userEmail).then(function() {
        window.alert("reset mail sent");
        window.open("LogIn.html", "_self");
    }).catch(function(error) {
        window.alert(error.message);
        document.getElementById("resetbtn").innerHTML = "Reset";
    });

}

function homepage() {
    window.open("index.html", "_self");
}