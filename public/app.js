const Peer = require('simple-peer');
const $    = require('jquery');
let localStream = document.getElementById("localStream");
let otherStream = document.getElementById("otherStream");

playVideo = (stream, localStream) => {
    localStream.srcObject = stream;
    localStream.onloadedmetadata = (e)=>{
        localStream.play();
    }
}

openStream = () => {
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then((stream)=>{
        playVideo(stream, localStream);
        
        const p = new Peer({initiator: location.hash === '#1', trickle: false, stream});
        p.on('signal',token => {
            $('#mySignal').val(JSON.stringify(token));
        });

        p.on('connect',()=>{
            console.log("Connected!");
        });

        p.on('stream', stream => {
            console.log(stream);
            playVideo(stream, otherStream);
        })

        $('#btnConnect').click(()=>{
            let otherSignal = $('#otherSignal').val();
            p.signal(otherSignal);
        });
    })
    .catch((err)=>{
        console.log(err);
    });
}

openStream();