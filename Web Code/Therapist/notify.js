let nnty = 0,
    Uoid = localStorage.getItem("MeetId");
navigator.serviceWorker.register('/service-worker.js');
Notification.requestPermission().then(function(permission) {
    if (permission != "granted") {
        alert("Notification failed!");
        return;
    }
});
firebase.database().ref("users/" + Uoid).on("value", function(snapshot) {
    if (nnty > 0) {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification("Hello,", {
                body: "New Message from ChatRoom",
                icon: '/img/logo.png',
                data: "/ChatRoom/pages/home.html",
            });
        });
    }
    ++nnty;
});