var _0xa39a = ["\x76\x61\x6C\x75\x65", "\x75\x69\x64", "\x63\x75\x72\x72\x65\x6E\x74\x55\x73\x65\x72", "\x61\x75\x74\x68", "\x76\x61\x6C", "\x2F\x43\x68\x65\x63\x6B\x6F\x75\x74\x2F\x69\x6E\x64\x65\x78\x2E\x68\x74\x6D\x6C", "\x5F\x73\x65\x6C\x66", "\x6F\x70\x65\x6E", "\x6F\x6E", "\x4D\x65\x65\x74\x69\x6E\x67\x53\x63\x68\x65\x64\x75\x6C\x65", "\x72\x65\x66", "\x64\x61\x74\x61\x62\x61\x73\x65"];
firebase[_0xa39a[11]]()[_0xa39a[10]](_0xa39a[9])[_0xa39a[8]](_0xa39a[0], (_0x3202x1) => { let _0x3202x2 = firebase[_0xa39a[3]]()[_0xa39a[2]][_0xa39a[1]]; if (_0x3202x1[_0xa39a[4]]()[_0x3202x2] === undefined) { window[_0xa39a[7]](_0xa39a[5], _0xa39a[6]) } })

let c = 0,
    obj, length, Uid, useremail, username;

document.getElementsByClassName("card-container")[0].innerHTML = `  <div style="padding-bottom:5%; font-size:170%;"><i class="fa fa-group" style="color:rgb(19, 187, 164);"></i> <b>ChatBot Meet</b></div><div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
</div><br>`

firebase.database().ref().on('value', (snapshot) => {
    Uid = firebase.auth().currentUser.uid;
    username = snapshot.val().users[Uid].Full_Name;
    useremail = firebase.auth().currentUser.email;
    if (snapshot.val().MeetingSchedule[Uid].Request !== undefined) {
        document.getElementsByClassName("card-container")[0].innerHTML = snapshot.val().MeetingSchedule[Uid].Request;
    } else {
        loaddata();
    }
});


firebase.database().ref().on('value', (snapshot) => {
    Uid = firebase.auth().currentUser.uid;
    MS = snapshot.val().MeetingSchedule[Uid].TimeSlot;
    if (MS !== undefined) {
        document.getElementById('Countdown').style.display = "inline-block";
        document.getElementById('Verify').style.display = "none";
        let aw = MS.split('T');
        let D = aw[0].split('-');
        let TSlot = D[1] + " " + D[2] + ", " + D[0] + " " + aw[1];
        CountDownStart(TSlot);
    }
});


function CountDownStart(k) {
    var countDownDate = new Date(k).getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (days == 0) {
            document.getElementById('Countdown').innerHTML = hours + ":" +
                minutes + ":" + seconds + " Left";
        } else {
            document.getElementById('Countdown').innerHTML = days + " Days, " + hours + ":" +
                minutes + ":" + seconds + " Left";
        }
        if (distance < 0) {
            clearInterval(x);
            document.getElementById('JoinBtn').style.display = "inline-block";
            document.getElementById('Countdown').style.display = "none";
        }
    }, 1000);
}


function loaddata() {
    document.getElementsByClassName("card-container")[0].innerHTML = `  <div style="padding-bottom:5%; font-size:170%;"><i class="fa fa-group" style="color:rgb(19, 187, 164);"></i> <b>ChatBot Meet</b></div><div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
</div><br>`
    firebase.database().ref().on('value', (snapshot) => {
        obj = Object.values(snapshot.val().Theraphist)[c];
        length = (Object.keys(snapshot.val().Theraphist).length) - 1;
        document.getElementsByClassName("card-container")[0].innerHTML = `<div style="display:flex; justify-content:center; justify-content:space-around; padding-bottom:5%;">
        <div style="font-size:200%;" title="ChatBot Home"><a href="/BotChat/index.html" style="color:rgb(236, 32, 230);"><i class="fa fa-home"></i></a></div>
        <div style="font-size:170%;" title="ChatBot Meet"><i class="fa fa-group" style="color:rgb(19, 187, 164);"></i></div>
        <div><b style="color:red;font-size:200%; cursor:pointer;" title="Sign Out" onclick="signOut()"><i class="fa fa-sign-out"></i></b></div>
    </div>
        <div style="display:flex; justify-content:center; align-items:center; justify-content:space-around;">
            <div ${(c==0)? '>&ensp;':'onclick="prev()" style="cursor:pointer;"><i class="fa fa-arrow-left"></i>'} </div>
            <div> <img class="round" src=${obj.imglink} height=130 width=130 alt="user"/></div>
            <div ${(c==length)? '>&ensp;':'onclick="next()" style="cursor:pointer;"><i class="fa fa-arrow-right"></i>'}</div>
        </div>
        <h3 >${obj.name}</h3>
        <h6 >${obj.location}</h6>
        <p style="padding:0px 15px;">${obj.detail}</p>
        <div class="buttons">
            <button class="primary" onclick="sendMail()">Request to Meet</button>
        </div>
        <br>`;
    });
}


function prev() {
    --c;
    loaddata();
}

function next() {
    ++c;
    loaddata();
}

function sendMail(params) {
    document.getElementsByClassName("primary")[0].innerHTML = "Please Wait...";
    var tempParams = {
        from_name: username,
        uid: Uid,
        ue: useremail,
        to_email: obj.email
    };
    let UI = `<div style="display:flex; justify-content:center; justify-content:space-around; padding-bottom:5%;">
    <div style="font-size:200%;" title="ChatBot Home"><a href="/BotChat/index.html" style="color:rgb(236, 32, 230);"><i class="fa fa-home"></i></a></div>
    <div style="font-size:170%;" title="ChatBot Meet"><i class="fa fa-group" style="color:rgb(19, 187, 164);"></i></div>
    <div><b style="color:red;font-size:200%; cursor:pointer;" title="Sign Out" onclick="signOut()"><i class="fa fa-sign-out"></i></b></div>
</div>
    <div> <img class="round" src=${obj.imglink} height=130 width=130 alt="user" /></div>
    <h3>${obj.name}</h3>
    <h6>${obj.location}</h6>
    <p style="padding:0px 15px;">${obj.detail}</p>
    <div class="buttons">
        <button id="Verify" style="cursor:progress;">Wait for your TimeSlot</button>
        <button id="Countdown" style="display:none;">Loading...</button>
        <button id="JoinBtn" style="display:none;" onclick="meet()">Join</button><br>
        <button id="ReseT" style="background-color:red" onclick="ResET()">Reset Meet</button>
    </div>
    <br>`;
    emailjs.send('service_oxqlh9h', 'template_ndmtcca', tempParams)
        .then(function(res) {
            firebase.database().ref('MeetingSchedule/' + Uid).update({
                Request: UI,
                T_Email: obj.email,
                Meet_Id: obj.meetid,
            }).then(function() {
                window.alert("Your request has been sent successfully...We are notify your Timeslot! So please don't close chatbot browser tab (or) chatbot run in background with any chatbot page!");
                location.reload();
            }).catch(function() {
                window.alert("Error");
                document.getElementsByClassName("primary")[0].innerHTML = "Request to Meet";
            })
        }).catch(function() {
            window.alert("Error");
            document.getElementsByClassName("primary")[0].innerHTML = "Request to Meet";
        })
}

function ResET() {
    window.open("resetmeet.html", "_self");
}

function meet() {
    firebase.database().ref('MeetingSchedule/' + [Uid]).on('value', (snapshot) => {
        let MeetingId = snapshot.val().Meet_Id;
        localStorage.setItem("MeetId", MeetingId);
        window.open("/Video Call/meet.html", "_self");
    });
}