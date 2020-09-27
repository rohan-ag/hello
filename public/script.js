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
    audio: true
}).then(stream => {
    videoStream = stream;
    addVideoStream(myVideo, stream);
}).catch(onCancel => {
    console.log(onCancel)
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

socket.on('user-connected', (userId) => {
    connectNewUser(userId);
})

const connectNewUser = (userId) => {
    console.log('user has joined', userId)
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => video.play())
    videoGrid.append(video);
}