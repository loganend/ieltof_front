import React, {Component} from "react";
import styles from "./Conversations.css";
import classNames from "classnames";
import Conversation from "components/ChatPage/Conversations/Conversation";

export default class Conversations extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className={classNames({[styles.left_inbox]: true})}>
                <div className={classNames({[styles.top_bar_messages]: true})}>
                    <div className={styles.relative}>
                        <span>Conversations</span>
                    </div>
                </div>
                <div className={classNames({[styles.conversations_container]: true})}>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                </div>
            </div>
        )
    }

}

