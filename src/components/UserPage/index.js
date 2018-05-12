import React, {Component} from "react";
import styles from "./UserPage.css";
import classNames from "classnames";
import ChatPage from "components/ChatPage";
import Community from "components/Community";
import Tests from "components/Tests";
import * as MainServices from "../../services/MainServices";
import * as UserServices from "../../services/UserServices";
import UserStore from "../../stores/UserStore";
import dispatcher from "../../dispatcher";



export default class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props;
        this.state.avatar = "";
        this.state.tab =
            <div className={classNames({[styles.container_app]: true})}>
                <Community/>
            </div>;
        console.log(this.state.user.name);

        this.socket = new WebSocket("wss://cheremisin.info/api/v1/user");
        // this.socket = new WebSocket("ws://127.0.0.1:8080/api/v1/user");
    }

    componentDidMount() {
        window.FB.api(
            "/me/picture",
            {
                "redirect": false,
                "type": "large"
            },
            (response) => {
                console.log(response)
                console.log(response.data.url)
                this.state.avatar = response.data.url;

                UserServices.getUser(this.state);
                this.setState({})
                if (response && !response.error) {
                    /* handle the result */
                }
            }
        );

        this.socket.onopen = () => {
            console.log("Соединение установлено.");
        };

        this.socket.onclose = (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };

        this.socket.onerror = (error) => {
            console.log("Ошибка " + error.message);
        };

        this.socket.onmessage = (event) => {
            console.log("Получены данные " + event.data);
            let message = JSON.parse(event.data);
            console.log("event" + event.data);

            switch (message.action) {
                case 'initMessage':
                    break;

                case 'sendMessage':
                    message.body.Text = message.body.Text.replace(/''/g, "'");
                    dispatcher.dispatch({
                        type: "REVIEVE_NEW_MESSAGE",
                        message: message.body
                    });
                    break;
            }
        };
    }


    componentWillMount() {
        UserStore.on("get_user_event", this.onGetUserEvent.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeListener("get_user_event", this.onGetUserEvent.bind(this));
    }

    onGetUserEvent() {
        let profile = UserStore.getProfile();
        let message = {
            type: "initMessage",
            action: "initMessage",
            body: {
                user_id: profile.Id
            }
        };
        this.socket.send(JSON.stringify(message));

        UserServices.getFriends();
        UserServices.getOnlineUsers();
    }

    facebookLogout() {
        MainServices.facebookLogout();
    }

    openCommunity() {
        this.state.tab =
            <div className={classNames({[styles.container_app]: true})}>
                <Community/>
            </div>;
        this.setState({});
    }

    openMessages() {
        this.state.tab =
            <div className={classNames({"container-app": true, [styles.container_app_inbox]: true})}>
                <ChatPage socket={this.socket}/>
            </div>;
        this.setState({});
    }

    openTests() {
        this.state.tab =
            <div className={classNames({[styles.container_app]: true})}>
                <Tests/>
            </div>;
        this.setState({});
    }


    render() {
        return (
            <div>
                <navbar>
                    <div className={styles.navbar_content}>
                        <div className={styles.navbar_content_main}>
                            <div className={styles.porfile_navbar}>
                                <a>
                                    <img className={styles.profile_picture_navbar} src={this.state.avatar}/>
                                </a>
                                <div className={classNames({"dropdown": true, [styles.name_navbar]: true})}>
                                    <a className={styles.name_profile_button} style={{color: "#fff"}} type="button"
                                       id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="true">
                                        <div className={styles.bold} style={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {this.state.user.name} <i className={classNames({
                                            "fa": true,
                                            "fa-caret-down": true,
                                            [styles.fa_caret_down]: true
                                        })}></i></div>
                                    </a>
                                    <ul className={classNames({"dropdown-menu": true})} aria-labelledby="dropdownMenu1">
                                        {/*<li><a href="/buddies/">Friends</a>*/}
                                        {/*</li>*/}
                                        {/*<li><a href="/settings/"*/}
                                        {/*ng-bind-html="'NAVBAR_SETTINGS' | translate">Settings</a></li>*/}
                                        {/*<li role="separator" class="hl"></li>*/}
                                        {/*<li><a report-problem="" report-from="Navbar">Report a problem</a></li>*/}
                                        <li><a logout="" onClick={this.facebookLogout.bind(this)}>Log out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.menu_navbar_container} style={{color: 'white'}}>
                            <ul className={styles.main_navigation_navbar}>
                                <li>
                                    <a onClick={this.openCommunity.bind(this)}>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_group_chat}></i>
                                                {/*<i className="icon-set-1 icon-group-chat middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle" ng-bind-html="'COMMUNITY' | translate">
                                                    Community
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.openMessages.bind(this)}>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_chat_double_bubble}></i>
                                                {/*<i className="icon-set-1 icon-chat-double-bubble middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle"
                                                     ng-bind-html="'HEADING_MESSAGE' | translate">Messages
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.openTests.bind(this)}>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_test_speaking}></i>
                                                {/*<i className="icon-set-1 icon-chat-double-bubble middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle"
                                                     ng-bind-html="'HEADING_MESSAGE' | translate">Go to Test
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </navbar>
                {this.state.tab}
            </div>
        )
    }
}

