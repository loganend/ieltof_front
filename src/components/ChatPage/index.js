import React, {Component} from "react";
import styles from "./ChatPage.css";
import ChatWindow from "components/ChatPage/ChatWindow";
import Conversations from "components/ChatPage/Conversations";

import * as UserServices from "../../services/UserServices"
import UserStore from "../../stores/UserStore"

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: new Map()
        }
    }

    componentDidMount() {
        UserServices.getFriends();
    }

    componentWillMount() {
        UserStore.on("get_friends_event", this.onGetFriendsEvent.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeListener("get_friends_event", this.onGetFriendsEvent.bind(this));
    }

    onGetFriendsEvent() {
        let friends = UserStore.getFriends();
        console.log(friends);
        this.setState({friends: friends})
    }


    render() {
        return (
            <div className={styles.subcontainer_messages}>
                <Conversations friends={this.state.friends}/>

                <ChatWindow/>

            </div>
        )
    }

}

