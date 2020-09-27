const socket = io('/')
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
})

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

let videoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream => {
    videoStream = stream;
    addVideoStream(myVideo, stream);

    /*
        Receives Call event . Answers the call and pass the callee stream. Also receives the caller stream and adds to the view.
    */
    peer.on('call', call => {
        call.answer(stream);
        const videoElement = document.createElement('video');
        call.on('stream', userVideoStream => addVideoStream(videoElement, userVideoStream))
    });

    /*
        Notify when a new user connects  and pass video stream.
    */
    socket.on('user-connected', (userId) => {
        setTimeout(function () {
            connectNewUser(userId, stream);
        }, 500)
    });

}).catch(onCancel => {
    console.log(onCancel)
})



/*
Opens a new Peer connection and emits the join room event with roomId and peerId
*/
peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

const connectNewUser = (userId, myStream) => {
    const call = peer.call(userId, myStream);
    const videoElement = document.createElement('video');
    call.on('stream', userVideoStream => addVideoStream(videoElement, userVideoStream))
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => video.play())
    videoGrid.append(video);
}