import React, {Component} from "react";
import styles from "./ChatPage.css";
import ChatWindow from "components/ChatPage/ChatWindow";
import Conversations from "components/ChatPage/Conversations"

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={styles.subcontainer_messages}>
                <Conversations/>

                <ChatWindow/>

            </div>
        )
    }

}

