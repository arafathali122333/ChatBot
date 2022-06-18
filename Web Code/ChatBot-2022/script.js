var name, Email, Pno, pass1, pass2, male, female;

function validate() {
    name = document.getElementById("username").value,
        Email = document.getElementById("email_field").value,
        Pno = document.getElementById("ph_number").value,
        pass1 = document.getElementById("password_field").value,
        pass2 = document.getElementById("re_password").value,
        male = document.getElementById("dot-1").checked,
        female = document.getElementById("dot-2").checked;

    if (name == "") {
        alert("Please enter your Name");
        document.getElementById("username").focus();
        return
    }
    if (male === false && female === false) {
        alert("Please select your gender");
        return
    }
    if (Email == "") {
        alert("Please enter your Mail Id");
        document.getElementById("email_field").focus();
        return
    }
    if (Pno == "") {
        alert("Please enter your phone number");
        document.getElementById("ph_number").focus();
        return
    }
    if (Pno.length != 10) {
        alert("Please Enter Your Phone Number Correctly");
        document.getElementById("ph_number").focus();
        return
    }
    if (pass1 == "") {
        alert("Please enter your password");
        document.getElementById("password_field").focus();
        return
    }
    if (pass2 == "") {
        alert("Please enter your confirm password");
        document.getElementById("re_password").focus();
        return
    }
    if (pass1 != pass2) {
        alert("Password & Confirm Password aren't same");
        document.getElementById("password_field").focus();
        return
    }
    if (pass1 === pass2) {
        if (pass1.length > 7 && pass1.match(/[0-9]/g) && pass1.match(/[a-z]/g) && pass1.match(/[A-Z]/g)) {
            document.getElementById("regbtn").innerHTML = "Please Wait...";
            create();
        } else {
            alert("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters!");
            document.getElementById("password_field").focus();
            return
        }
    }

}

function create() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {
        sendlink();
    }).catch(function(error) {
        document.getElementById("regbtn").innerHTML = "Register";
        window.alert(error.message);
    });
}

function sendlink() {
    var user = firebase.auth().currentUser;
    var gender;
    if (male) {
        gender = 'male';
    } else if (female) {
        gender = 'female';
    }
    user.sendEmailVerification().then(function() {

        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
            Full_Name: name,
            Gender: gender,
            E_Mail: Email,
            Phone_Number: "+91" + Pno
        }).then(function() {
            window.open("verify.html", "_self");
        }).catch(function(error) {
            document.getElementById("regbtn").innerHTML = "Register";
            window.alert(error.message);
        });


    }).catch(function(error) {
        document.getElementById("regbtn").innerHTML = "Register";
        window.alert(error.message);
    });
}

function homepage() {
    window.open("index.html", "_self");
}