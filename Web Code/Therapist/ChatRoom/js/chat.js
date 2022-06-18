function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


var database = firebase.database().ref("/")


var recieverId = localStorage.getItem(`recieverID`)
recieverId = JSON.parse(recieverId)
    // console.log(recieverId)

database.child(`users/${recieverId}`).on(`value`, value => {
    let reciever = value.val()
        // console.log(reciever)

    document.getElementById(`recieverUser`).innerHTML = `@` + reciever.Full_Name.toLowerCase()
    document.getElementsByClassName("spinner")[0].style.display = "none";
})

var wage = document.getElementById("textMessage");
wage.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        sendMessages();
    }
});


document.getElementById(`sendMessage`).addEventListener(`click`, sendMessages)


function sendMessages() {
    if ((document.getElementById(`textMessage`).value) != "") {
        let currentuser = localStorage.getItem(`Current_userID`)
        currentuser = JSON.parse(currentuser)
        console.log(currentuser)
        let yourMessage = document.getElementById(`textMessage`).value
        console.log(yourMessage)
        let date = new Date;
        let DATETIME = date.getHours() + ":" + date.getMinutes() + "  " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() % 100;
        console.log(DATETIME);
        let messageObj = {
            message: yourMessage,
            DateandTime: DATETIME,
            senderId: currentuser,
            senderIs: `true`
        }
        database.child(`users/${currentuser}/${recieverId}/Messages`).push(messageObj);
        let messageObjRec = {
            message: yourMessage,
            DateandTime: DATETIME,
            senderId: currentuser,
            senderIs: `false`
        }
        database.child(`users/${recieverId}/${currentuser}/Messages`).push(messageObjRec);
        document.getElementById(`textMessage`).value = "";
        var objDiv = document.getElementById("mesages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}


// database.child(`Current_user`).on(`value`, currentUser1 => {
//   let currentuser1 = currentUser1.val()
// })

var currentuser = localStorage.getItem(`Current_userID`)
currentuser = JSON.parse(currentuser)
    // console.log(currentuser)



database.child(`users/${currentuser}/${recieverId}/Messages`).on(`child_added`, messages => {

    let message = messages.val()
        // console.log(message.message)

    var messageDiv = document.getElementById(`mesages`)
    messageDiv.style = `overflow: auto;`
    var mess = document.createElement(`h5`)
    mess.innerHTML = `${message.message} <span style="color:black; font-size:60%;">${message.DateandTime}</span>`;
    messageDiv.appendChild(mess);
    if (message.senderIs === `true`) {
        mess.style = `text-align: right;color: blue;`
    }
    if (message.senderIs === `false`) {
        mess.style = `color: black; `
    }
    var objDiv = document.getElementById("mesages");
    objDiv.scrollTop = objDiv.scrollHeight;
})
if (localStorage.getItem("MeetId") === null) {
    window.open("/index.html", "_self");
}