const db = firebase.database();
const fetchChat = db.ref("messages/");
var username;
firebase.database().ref('users').on('value', (snapshot) => {
    let kpp = firebase.auth().currentUser.uid;
    username = snapshot.val()[kpp].Full_Name;
    localStorage.setItem(`Current_user`, JSON.stringify(snapshot.val()[kpp]));
    localStorage.setItem(`Current_userID`, JSON.stringify(kpp));
    getmsgdata();
});


var input = document.getElementsByClassName("msger-input")[0];
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        msg(e);
    }
});

function msg(e) {
    if ((document.getElementsByClassName("msger-input")[0].value) != "") {
        e.preventDefault();
        const timestamp = Date.now();
        const messageInput = document.getElementsByClassName("msger-input")[0];
        const message = messageInput.value;
        messageInput.value = "";
        let date = new Date;
        const DateandTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + (date.getFullYear() % 100) + "  " + date.getHours() + ":" + date.getMinutes();
        db.ref("messages/" + timestamp).set({
            username,
            message,
            DateandTime,
        });
        var objDiv = document.getElementsByClassName("msger-chat")[0];
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}


function getmsgdata() {
    fetchChat.on("child_added", function(snapshot) {
        const messages = snapshot.val();
        document.getElementsByClassName("spinner")[0].style.display = "none";
        if (username === messages.username) {
            const message = `<div class="msg right-msg">
                        <div class="msg-bubble">
                            <div class="msg-info">
                                <div class="msg-info-name">${messages.username}</div>
                                <div class="msg-info-time">${messages.DateandTime}</div>
                            </div>
                            <div class="msg-text">
                            ${messages.message}
                            </div>
                        </div>
                    </div>`;
            document.getElementsByClassName("msger-chat")[0].innerHTML += message;
        } else {
            const message = `<div class="msg left-msg">
                        <div class="msg-bubble">
                            <div class="msg-info">
                                <div class="msg-info-name">${messages.username}</div>
                                <div class="msg-info-time">${messages.DateandTime}</div>
                            </div>
                            <div class="msg-text">
                            ${messages.message}
                            </div>
                        </div>
                    </div>`;
            document.getElementsByClassName("msger-chat")[0].innerHTML += message;
        }
    });
}