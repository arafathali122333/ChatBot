let lnty = 0,
    mnty = 0,
    nnty = 0,
    Uoid;
navigator.serviceWorker.register('/service-worker.js');
Notification.requestPermission().then(function(permission) {
    if (permission != "granted") {
        alert("Notification failed!");
        return;
    }
});

firebase.database().ref().on('value', (snapshot) => {
    Uoid = firebase.auth().currentUser.uid;
});


var timer = setInterval(NTY, 1000);

function NTY() {
    if (Uoid !== undefined) {
        clearInterval(timer);
        firebase.database().ref("messages/").on("value", function(snapshot) {
            if (mnty > 0) {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification("Hello!", {
                        body: "New Message from DiscussionRoom...",
                        icon: '/img/logo.png',
                        data: "/Discussion/index.html",
                    });
                });
            }
            ++mnty;
        });

        firebase.database().ref("MeetingSchedule/" + Uoid + "/TimeSlot").on("value", function(snapshot) {
            if (lnty > 0) {
                let msg = snapshot.val();
                if (msg !== null) {
                    navigator.serviceWorker.ready.then(function(registration) {
                        registration.showNotification("Hello,", {
                            body: msg + " is your Timeslot",
                            icon: '/img/logo.png',
                            data: "/Chatmeet/index.html",
                        });
                    });
                }
            }
            ++lnty;
        });

        firebase.database().ref("users/" + Uoid).on("value", function(snapshot) {
            if (nnty > 0) {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification("Hello,", {
                        body: "New Message from ChatRoom",
                        icon: '/img/logo.png',
                        data: "/Private Chat/pages/home.html",
                    });
                });
            }
            ++nnty;
        });
    }
}