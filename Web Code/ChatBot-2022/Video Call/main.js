const APP_ID = localStorage.getItem("MeetId");
const TOKEN = null;
const CHANNEL = "any-channel";

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async() => {

    client.on('user-published', handleUserJoined)

    client.on('user-left', handleUserLeft)

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}">
                        </div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let joinStream = async() => {
    document.getElementById('stream-controls').style.display = 'flex'
    await joinAndDisplayLocalStream()
}

let handleUserJoined = async(user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if (mediaType === 'video') {
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null) {
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio') {
        user.audioTrack.play()
    }
}

let handleUserLeft = async(user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async() => {
    window.open("/Chatmeet/index.html", "_self");
}

let toggleMic = async(e) => {
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false)
        document.getElementById('mic-btn').innerHTML = `<i class='fa fa-microphone-slash'></i>`;
    } else {
        await localTracks[0].setMuted(true)
        document.getElementById('mic-btn').innerHTML = `<i class='fa fa-microphone'></i>`;
    }
}

let toggleCamera = async(e) => {
    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false)
        document.getElementById('camera-btn').innerHTML = `<span class="iconify" data-icon="mdi:camera-off"></span>`;
        document.getElementById('camera-btn').style.padding = "10px 10px 5px 10px";
        document.getElementById('camera-btn').style.fontSize = "150%";
    } else {
        await localTracks[1].setMuted(true)
        document.getElementById('camera-btn').innerHTML = `<i class="fa fa-camera"></i>`;
        document.getElementById('camera-btn').style.padding = "12px 12px 10px 12px";
        document.getElementById('camera-btn').style.fontSize = "120%";
    }
}

joinStream();
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)