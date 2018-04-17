import React, {Component} from "react";
import Peer, {DataConnection} from "peerjs";
import Chat from "components/Chat";
import QuestionBlock from "components/QuestionBlock";
import * as TestServices from "../../services/TestServices";
import styles from "./TestPage.css";
import classNames from "classnames";
import PreloaderIcon from "react-preloader-icon";
import Oval from "react-preloader-icon/loaders/Oval";

export default class TestPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            peer_id: null,
            username: null,
            conn: null,
            call: null,
            peer: new Peer({
                host: "cheremisin.info",
                port: 9000,
                path: '/peerjs',
                secure: true,
                config: {
                    'iceServers': [
                        {url: 'stun:stun1.l.google.com:19302'},
                        {
                            url: 'turn:numb.viagenie.ca',
                            credential: 'muazkh',
                            username: 'webrtc@live.com'
                        }
                    ]
                }
            }),
            test: null
        };

        this.socket = new WebSocket("wss://cheremisin.info/api/v1/client");


        this.innerStyles = {
            bStart: {
                display: 'block'
            },
            bNext: {
                display: 'none'
            },
            preloader: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                overflow: 'visible',

                display: 'none'
            }
        };

        this.requestLocalVideo = this.requestLocalVideo.bind(this);
        this.onReceiveStream = this.onReceiveStream.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }


    componentDidMount() {

        this.state.peer.on('open', () => {
            console.log("peer open");
            this.state.peer_id = this.state.peer.id;
        });

        this.state.peer.on('connection', (connection) => {
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

        this.state.peer.on('error', function (err) {
            console.error(err);
        });

        this.state.peer.on('call', (call) => {
            console.log('peer.on receive call');

            // let acceptsCall = confirm("Videocall incoming, do you want to accept it ?");

            if (true) {
                call.answer(window.localStream);
                call.on('stream', (stream) => {
                    window.peer_stream = stream;
                    // this.onReceiveStream(stream, 'peer-camera');

                    let video = document.getElementById('peer-camera');
                    video.src = window.URL.createObjectURL(stream);
                    window.peer_stream = stream;
                });

                call.on('close', () => {
                    // alert("The videocall has finished");
                });

            } else {
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
                    Body: {
                        token: this.state.peer_id
                    }
                };
                this.socket.send(JSON.stringify(message));
            },
            error: (err) => {
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
                // alert('Соединение закрыто чисто');
            } else {
                // alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            // alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        this.socket.onerror = (error) => {
            // alert("Ошибка " + error.message);
        };

        this.socket.onmessage = (event) => {

            let obj = JSON.parse(event.data);
            console.log("event" + event.data);

            switch (obj.action) {
                case 'init':
                    console.log("init" + event.data);
                    if (obj.status) {

                        this.state.conn = this.state.peer.connect(obj.status, {
                            metadata: {
                                'username': "username"
                            }
                        });

                        this.state.conn.on('data', this.handleMessage);

                        this.innerStyles.preloader = {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',

                            display: 'none'
                        };

                        this.setState({});

                        let message = {
                            Type: "GET_TEST",
                            Action: "GET_TEST",
                            Body: {
                                token: ""
                            }
                        };

                        this.socket.send(JSON.stringify(message));

                    } else {
                        console.error("error " + event.data);
                        console.log("You need to provide a peer to connect with !");
                        return false;
                    }
                    break;

                case 'init2':

                    this.innerStyles.preloader = {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        overflow: 'visible',

                        display: 'none'
                    }
                    this.setState({});

                    let message = {
                        Type: "GET_TEST",
                        Action: "GET_TEST",
                        Body: {
                            token: ""
                        }
                    };
                    this.socket.send(JSON.stringify(message));

                    break;

                case 'STOP_VIDEO_CHAT':

                    break;

                case 'DISCONNECTED_PAIR':
                    let video = document.getElementById('peer-camera');
                    video.src = null;
                    window.peer_stream = null;
                    this.setState({});
                    break;

                case 'sendMessage':
                    console.log("sendMessage");
                    TestServices.onChatMessage(obj.status);
                    break;

                case 'GET_TEST':
                    console.log('GET_TEST');
                    console.log(obj.body);
                    TestServices.onTestQuestions(obj.body);
                    break;
            }
        };
    }

    requestLocalVideo(callbacks) {
        // Monkeypatch for crossbrowser geusermedia
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Request audio an video
        navigator.getUserMedia({audio: true, video: true}, callbacks.success, callbacks.error);
    }

    handleMessage(data) {
        let orientation = "text-left";

        // If the message is yours, set text to right !
        if (data.from == username) {
            orientation = "text-right"
        }

        let messageHTML = '<a href="javascript:void(0);" class="list-group-item' + orientation + '">';
        messageHTML += '<h4 class="list-group-item-heading">' + data.from + '</h4>';
        messageHTML += '<p class="list-group-item-text">' + data.text + '</p>';
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
                                    <video id="peer-camera" className="peer-camera center-block"
                                           autoplay="autoplay"></video>
                                    <span className="label label-info" id="connected_peer"></span>
                                </div>
                                <div className="text-center video-1-1 video-1-1-my">
                                    <video id="my-camera" className="my-camera center-block" autoplay="autoplay"
                                           muted="true"></video>
                                </div>
                            </div>
                            <div style={this.innerStyles.preloader}>
                                <PreloaderIcon
                                    loader={Oval}
                                    size={80}
                                    strokeWidth={8} // min: 1, max: 50
                                    strokeColor="#F0AD4E"
                                    duration={800}
                                />
                            </div>
                        </div>
                        <div >
                            <div className={classNames({"container": true, [styles.connection_manager]: true})}>
                                <div className={classNames({"row": true, [styles.row_container]: true})}>
                                    <div className="col-sm-6">
                                        <button style={this.innerStyles.bStart} onClick={this.startVideoChat.bind(this)}
                                                type="button"
                                                className={classNames({
                                                    "btn btn-primary": true,
                                                    [styles.button_start]: true
                                                })}>
                                            <span className="tr" data-tr-id="1232" data-tr="start">start</span>
                                        </button>
                                        <button style={this.innerStyles.bNext} onClick={this.findNextPartner.bind(this)}
                                                type="button"
                                                className={classNames({
                                                    "btn btn-primary": true,
                                                    [styles.button_start]: true
                                                })}>
                                            <span className="tr" data-tr-id="1232" data-tr="start">next</span>
                                        </button>
                                    </div>
                                    <div className="col-sm-6">
                                        <button type="button" onClick={this.stopVideoChat.bind(this)}
                                                className={classNames({
                                                    "btn btn-primary": true,
                                                    [styles.button_stop]: true
                                                })}>
                                            <span className="tr" data-tr-id="1232" data-tr="start">stop</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 section section-2">
                        <QuestionBlock test={this.state.test}/>
                    </div>
                    <Chat className = {styles.chat} {...this.props} socket={this.socket}/>
                </div>
                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    startVideoChat() {

        this.innerStyles = {
            bStart: {
                display: 'none'
            },
            bNext: {
                display: 'block'
            }
        };

        this.innerStyles.preloader = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',

            display: 'block'
        };

        this.setState({});

        let message = {
            Type: "INIT_VIDEO_CHAT",
            Action: "INIT_VIDEO_CHAT",
            Body: {}
        };


        console.log("INIT_VIDEO_CHAT");
        this.socket.send(JSON.stringify(message));
    }

    findNextPartner() {

        this.innerStyles.preloader = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',

            display: 'block'
        };

        let video = document.getElementById('peer-camera');
        video.src = null;
        window.peer_stream = null;

        this.setState({});


        let message = {
            Type: "GET_NEXT_PARTNER",
            Action: "GET_NEXT_PARTNER",
            Body: {}
        };

        console.log("GET_NEXT_PARTNER");
        this.socket.send(JSON.stringify(message));
    }

    stopVideoChat() {
        console.log("STOP_VIDEO_CHAT");

        this.innerStyles = {
            bStart: {
                display: 'block'
            },
            bNext: {
                display: 'none'
            }
        };

        this.innerStyles.preloader = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',

            display: 'none'
        };


        let message = {
            Type: "STOP_VIDEO_CHAT",
            Action: "STOP_VIDEO_CHAT",
            Body: {}
        };

        this.socket.send(JSON.stringify(message));

        let video = document.getElementById('peer-camera');
        video.src = null;
        window.peer_stream = null;
        this.setState({});
    }
}

