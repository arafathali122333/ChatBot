function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
var currentuserid = localStorage.getItem(`Current_userID`)
currentuserid = JSON.parse(currentuserid)





var database = firebase.database().ref("/")



database.child(`users`).on(`child_added`, value => {
    let alluser = value.val();
    alluser.id = value.key
    console.log(alluser)


    var currentuser = localStorage.getItem(`Current_user`)
    currentuser = JSON.parse(currentuser)


    if (currentuser.id !== alluser.id) {
        document.getElementsByClassName("spinner")[0].style.display = "none";
        var mainDiv = document.getElementById(`user`)

        var div = document.createElement(`div`)
        div.setAttribute(`id`, `divSizing`)



        let name = document.createElement(`span`)
        name.setAttribute(`id`, `userName`)
        let nameText = document.createTextNode(`${alluser.Full_Name.toUpperCase()}`)
        name.appendChild(nameText)
        div.appendChild(name)




        let chatBtn = document.createElement(`input`)
        chatBtn.setAttribute(`type`, `button`)
        chatBtn.setAttribute(`value`, `Chat`)
        chatBtn.setAttribute(`id`, alluser.id)
        chatBtn.setAttribute(`class`, `btn btn-primary`)
        chatBtn.style = `float: right; margin-top: 15px; margin-right: 5px`
        div.appendChild(chatBtn)

        chatBtn.addEventListener(`click`, function() {
            window.location.href = `../pages/chat.html`
            console.log(this.id)
            localStorage.setItem(`recieverID`, JSON.stringify(this.id))
        })

        mainDiv.appendChild(div)
        if (document.getElementById(`${currentuserid}`) !== null) {
            document.getElementById(`${currentuserid}`).style.display = "none";
        }
    }
})