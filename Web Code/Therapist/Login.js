function login() {
    let ty = document.getElementById("meet_field").value,
        mkl;
    document.getElementById("loginbtn").innerHTML = "Please Wait...";
    if (ty != "") {
        firebase.database().ref().on('value', (snapshot) => {
            let check = Object.keys(snapshot.val().users);
            for (let i = 0; i < check.length; i++) {
                if (ty == check[i]) {
                    mkl = 1;
                    let cuser = snapshot.val().users[ty];
                    localStorage.setItem("Current_user", JSON.stringify(cuser));
                    localStorage.setItem("MeetId", ty);
                    localStorage.setItem("Current_userID", JSON.stringify(ty));
                    window.open("/home.html", "_self");
                }
            }
            if (mkl === undefined) {
                window.alert("You are not therapist in chatbot");
                document.getElementById("loginbtn").innerHTML = "Sign In";
            }
        });
    } else {
        window.alert("Please enter your MeetId/Id");
        document.getElementById("loginbtn").innerHTML = "Sign In";
    }
}
if (localStorage.getItem("MeetId") !== null) {
    window.open("/home.html", "_self");
}