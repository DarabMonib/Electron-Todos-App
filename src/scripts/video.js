var socket = io.connect('http://192.168.23.212:4000')
let username = null;
let videosFlex = document.querySelector('.videos-flex')

let darab = document.querySelector('#darab')
let zaryab = document.querySelector('#zaryab')

window.electronAPI.setDisplayName((ev, user) => {
    username = user
})

const video = document.getElementById("camera");
const captureButton = document.getElementById("capture-image");
const imageTag = document.getElementById("image");

    setInterval(() => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/jpeg', 0.1);
        socket.emit('video', [dataURL, username]);
    }, 75)


socket.on('video', ([imgLoad, userNameGet]) => {

    if(userNameGet === 'zaryab'){
        zaryab.src = imgLoad
    }
    if(userNameGet === 'darab'){
        darab.src = imgLoad
    }

})

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});