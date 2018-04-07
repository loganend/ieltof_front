import React, {Component} from "react";
import {Widget, addResponseMessage} from "react-chat-widget";
import TestStore from "../../stores/TestStore";

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.socket = this.props.socket;
        console.log(this.props);
        console.log(this.socket);
        console.log(this.props.socket);
        this.onChatMessage = this.onChatMessage.bind(this);
    }

    componentDidMount() {
    }

    componentWillMount() {
        TestStore.on("chat_message", this.onChatMessage);
    }

    componentWillUnmount() {
        TestStore.removeListener("chat_message", this.onChatMessage);
    }

    onChatMessage() {
        let message = TestStore.getChatMessage();
        console.log("message" + message);
        addResponseMessage(message);
        this.setState({});
    }

    handleNewUserMessage = (newMessage) => {

        let message ={
            type: "sendMessage",
            action: "sendMessage",
            body: {
                Author: "aa",
                Body : newMessage,
                Room:  1,
                Time: 0
            }
        };

        this.socket.send(JSON.stringify(message));

        console.log(`New message incomig! ${newMessage}`);
    };

    render() {
        return (
            <Widget
                handleNewUserMessage={this.handleNewUserMessage}
            />
        )
    }

}

