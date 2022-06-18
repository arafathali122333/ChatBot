function signOut() {
    firebase.auth().signOut().then(() => {
        window.open("/index.html", "_self");
    }).catch((error) => {
        console.log(error);
    });
}