import React, {Component} from 'react';
import Peer from 'peerjs';
import Chat from 'components/Chat';
import * as TestServices from "../../services/TestServices";

export default class TestPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            peer_id: null,
            username: null,
            conn: null,
            peer: new Peer({
                host: "localhost",
                port: 9000,
                path: '/peerjs',
                secure: true,
                debug: 3,
                config: {
                    'iceServers':[
                        { url: 'stun:stun1.l.google.com:19302' },
                        {
                            url: 'turn:numb.viagenie.ca',
                            credential: 'muazkh',
                            username: 'webrtc@live.com'
                        }
                    ]
                }
            })
        };

        this.socket = new WebSocket("ws://localhost:8080/api/v1/client");

        this.requestLocalVideo = this.requestLocalVideo.bind(this);
        this.onReceiveStream = this.onReceiveStream.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }


    componentDidMount() {

        this.state.peer.on('open', () => {
            this.state.peer_id = this.state.peer.id;
        });

        this.state.peer.on('connection',  (connection) => {
            console.log('peer.on connection');

            this.state.conn = connection;
            this.state.peer_id = connection.peer;
            this.state.conn.on('data', this.handleMessage);

            let call = this.state.peer.call(this.state.peer_id, window.localStream);
            call.on('stream', (stream) => {
                window.peer_stream = stream;
                let video = document.getElementById('peer-camera');
                video.src = window.URL.createObjectURL(stream);
                window.peer_stream = stream;
                // this.onReceiveStream(stream, 'peer-camera');
            });

        });

        this.state.peer.on('error', function(err){
            console.error(err);
        });

        this.state.peer.on('call', (call) => {
            console.log('peer.on receive call');

            let acceptsCall = confirm("Videocall incoming, do you want to accept it ?");

            if(acceptsCall){
                call.answer(window.localStream);
                call.on('stream', (stream) => {
                    window.peer_stream = stream;
                    // this.onReceiveStream(stream, 'peer-camera');

                    let video = document.getElementById('peer-camera');
                    video.src = window.URL.createObjectURL(stream);
                    window.peer_stream = stream;
                });

                call.on('close', () => {
                    alert("The videocall has finished");
                });

            }else{
                console.log("Call denied !");
            }
        });


        this.requestLocalVideo({
            success: (stream) => {
                console.log("requestLocalVideo success");
                window.localStream = stream;

                let video = document.getElementById('my-camera');
                // video.src = window.HTMLMediaElement.srcObject(stream);
                video.src = window.URL.createObjectURL(stream);
                window.peer_stream = stream;
                // this.onReceiveStream(stream, 'my-camera');

                let message = {
                    Type: "token",
                    Action: "token",
                    Body:{
                        token: this.state.peer_id
                    }
                };
                this.socket.send(JSON.stringify(message));
            },
            error: (err) =>{
                console.log("requestLocalVideo error");
                alert("Cannot get access to your camera and video !");
                console.error(err);
            }
        });

        this.socket.onopen = (event) => {
            console.log("Соединение установлено.");
        };

        this.socket.onclose = (event) => {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        this.socket.onerror = (error) => {
            alert("Ошибка " + error.message);
        };

        this.socket.onmessage  = (event) => {

            let obj = JSON.parse(event.data);

            if(obj.action === "init"){
                console.log("init");
                if (obj.status) {

                    this.state.conn = this.state.peer.connect(obj.status, {
                        metadata: {
                            'username': "username"
                        }
                    });

                    this.state.conn.on('data', this.handleMessage);

                    let message = {
                        Type: "getTest",
                        Action: "getTest",
                        Body:{
                            token: ""
                        }
                    };

                    this.socket.send(JSON.stringify(message));
                }else{
                    console.error("error " + event.data);
                    console.log("You need to provide a peer to connect with !");
                    return false;
                }

            }

            if(obj.action === "init2"){
                console.log("init2");

                let message = {
                    Type: "getTest",
                    Action: "getTest",
                    Body:{
                        token: ""
                    }
                };

                this.socket.send(JSON.stringify(message));

            }

            if(obj.action === "sendMessage"){
                TestServices.onChatMessage(obj.status);
            }

            if(obj.action === "getTest"){
                // insertTest(obj.body);
                console.log("getTest")
            }
        };
    }

    requestLocalVideo(callbacks) {
        // Monkeypatch for crossbrowser geusermedia
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Request audio an video
        navigator.getUserMedia({ audio: true, video: true }, callbacks.success , callbacks.error);
    }

    handleMessage(data) {
        let orientation = "text-left";

        // If the message is yours, set text to right !
        if(data.from == username){
            orientation = "text-right"
        }

        let messageHTML =  '<a href="javascript:void(0);" class="list-group-item' + orientation + '">';
        messageHTML += '<h4 class="list-group-item-heading">'+ data.from +'</h4>';
        messageHTML += '<p class="list-group-item-text">'+ data.text +'</p>';
        messageHTML += '</a>';

        document.getElementById("messages").innerHTML += messageHTML;

        this.state({});
    }

    onReceiveStream(stream, element_id) {

        let video = document.getElementById(element_id);
        video.src = window.URL.createObjectURL(stream);
        window.peer_stream = stream;
    }

    componentWillUnmount() {
        this.state.peer.disconnect();
    }

    render() {
        return (
            <div id="app" className="container-fluid app">
                <div className="row test-container">
                    <div className="col-sm-6 video-chat section section-1">
                        <div className="video-1">
                            <div className="video-1-peer">
                                <div className="text-center video-1-1 video-1-1-peer">
                                    <video id="peer-camera" className="peer-camera center-block" autoplay="autoplay" ></video>
                                    <span className="label label-info" id="connected_peer"></span>
                                </div>
                                <div className="text-center video-1-1 video-1-1-my">
                                    <video id="my-camera" className="my-camera center-block" autoplay="autoplay" muted="true"></video>
                                </div>
                            </div>
                        </div>
                        <Chat {...this.props} socket={this.socket}/>
                        {/*<div className="chat frame">*/}
                            {/*<ul id="message-holder" className="message-holder"></ul>*/}
                            {/*<div>*/}
                                {/*<div className="msj-rta macro">*/}
                                    {/*<div className="text text-r" style={{background:'whitesmoke'}}>*/}
                                        {/*<input id="messageholder" className="mytext" placeholder="Type a message"/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div style={{padding: 10 }}>*/}
                                    {/*<span className="glyphicon glyphicon-share-alt"></span>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="col-sm-6 section section-2">
                        {/*<div className="exam-title">*/}
                            {/*<p>IELTS speaking test</p>*/}
                        {/*</div>*/}
                        {/*<div className = "questions">*/}
                            {/*<div className="question question-1">*/}
                                {/*<div id="title-1" className="title"><p>Part1</p></div>*/}
                                {/*<div id="question-content-1" className="question-content question-content-1">*/}
                                    {/*<ol id="question-test-1">*/}
                                        {/*<li></li>*/}
                                        {/*<li> </li>*/}
                                        {/*<li> </li>*/}
                                        {/*<li> </li>*/}
                                    {/*</ol>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="question question-2">*/}
                                {/*<div id="title-2" className="title"><p>Part2</p></div>*/}
                                {/*<div id="question-content-2" className="question-content question-content-2">*/}
                                    {/*<div className="question-2-belong">*/}
                                        {/*<div className="my-turn">Your topic</div>*/}
                                        {/*<div className="your-turn">Partner's topic</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="question-2-question"><p>Describe a house / apartament that someone you know lives in.</p></div>*/}
                                    {/*<div className="question-2-begin">You should say</div>*/}
                                    {/*<div className="a">*/}
                                        {/*<ul id="question-test-1">*/}
                                            {/*<li>Whose house/apartament this is</li>*/}
                                            {/*<li>Where the house/ apartament is</li>*/}
                                            {/*<li>What it looks like inside</li>*/}
                                        {/*</ul>*/}
                                        {/*<p id="question-2-last" className="question-2-last">and explain what you like or dislike about this person’s house/ apartament</p>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div id="title-3" className="question question-3">*/}
                                {/*<div className="title"><p>Part3</p></div>*/}
                                {/*<div id="question-content-3" className="question-content question-content-3">*/}
                                    {/*<ol id="question-test-3">*/}
                                        {/*<li>What kinks of home are most popular in your country ?</li>*/}
                                        {/*<li>What do you think are the advantages of living in a house rather than an apartament?</li>*/}
                                        {/*<li>Do you think that everyone would like to live in a larger home? Why is that?</li>*/}
                                    {/*</ol>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }
}

