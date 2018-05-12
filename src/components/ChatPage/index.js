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
            friends: new Map(),
            dialogKey: null
        }
    }

    componentDidMount() {
        UserServices.getFriends();
    }

    componentWillMount() {
        UserStore.on("get_friends_event", this.onGetFriendsEvent.bind(this));
        UserStore.on("open_dialog", this.onOpenDialog.bind(this));
        UserStore.on("ignore_friendship", this.onIgnoreFriend.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeListener("get_friends_event", this.onGetFriendsEvent.bind(this));
        UserStore.removeListener("open_dialog", this.onOpenDialog.bind(this));
        UserStore.removeListener("ignore_friendship", this.onIgnoreFriend.bind(this));

    }

    onGetFriendsEvent() {
        let friends = UserStore.getFriends();
        console.log(friends);
        this.setState({friends: friends})
    }

    onOpenDialog() {
        this.state.dialogKey = UserStore.getDialog();
        this.forceUpdate();
    }

    onIgnoreFriend() {
        this.setState({friends: UserStore.getFriends(), dialogKey: UserStore.getDialog()})
    }


    render() {
        return (
            <div className={styles.subcontainer_messages}>
                <Conversations friends={this.state.friends}/>

                {this.state.dialogKey === null ? null : <ChatWindow friend={this.state.friends.get(this.state.dialogKey)} socket={this.props.socket}/>}

            </div>
        )
    }
}

