import React, {Component} from "react";
import styles from "./ChatWindow.css";
import classNames from "classnames";
import ReceivedMessage from "components/ChatPage/ChatWindow/ReceivedMessage";
import SendMessage from "components/ChatPage/ChatWindow/SendMessage";
import * as UserServices from "../../../services/UserServices";
import UserStore from "../../../stores/UserStore";

export default class ChatWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friend: this.props.friend,
            accept: this.props.friend.accept,
            profile: UserStore.getProfile()
        };
    }

    componentWillMount() {
        UserStore.on("accept_friendship", this.onAcceptFriendship.bind(this));
        UserStore.on("revieve_new_message_" + this.props.friend.friend_id, this.onMessageRecived.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeListener("accept_friendship", this.onAcceptFriendship.bind(this));
        UserStore.removeListener("revieve_new_message_" + this.props.friend.friend_id, this.onMessageRecived.bind(this));

    }

    onAcceptFriendship() {
        this.setState({accept: true})
    }

    onMessageRecived() {
        this.props.friend = UserStore.getFriends().get(this.state.friend.friend_id);
        this.setState({friend: UserStore.getFriends().get(this.state.friend.friend_id)});
    }

    renderMessages() {
        let messages = [];
        this.state.friend = this.props.friend;
        let propsMessages = this.state.friend.messages;
        console.log(this.state.friend);

        if (propsMessages === null) {
            return null;
        }

        propsMessages.map((el, index) => {
            if (el.UserId === this.state.profile.Id) {
                messages.push(<SendMessage text={el.Text}/>)
            } else {
                messages.push(<ReceivedMessage text={el.Text}/>)
            }
        });

        return messages;
    }

    render() {
        this.componentWillMount();
        this.componentWillUnmount();
        this.state.friend = this.props.friend;
        return (
            <div className={classNames({[styles.right_inbox]: true})}>
                <div className={classNames({[styles.top_bar_messages]: true})}>
                    <div
                        ng-if="conversationService.selectedConversation.type === CONSTANTS.CONVERSATIONS.ONE_TO_ONE_CONVERSATION">
                        <a class="link-to-profile"
                           ng-click="userCacheService.clearAndSetUser(conversationService.selectedConversation.user)"
                           ng-href="/user/1308722" href="/user/1308722">
                            {this.state.friend.name}
                        </a>
                        <is-online-green-button ng-if="!conversationService.selectedConversation.user.isConnected"
                                                class="text-last-connection"
                                                user="conversationService.selectedConversation.user" style={{}}>
                            <span style={{fontSize: 12, color: '#9AA2A7'}}>
                            </span>
                        </is-online-green-button>
                    </div>
                </div>
                <div className={classNames({[styles.display_chat]: true})}>
                    <div className={classNames({[styles.user_information]: true})}>
                        <div style={{position: 'relative'}}>
                            <div>
                                <a>
                                    <img className={classNames({[styles.profile_picture_conversation]: true})}
                                         style={{width: 115}}
                                         src={this.state.friend.url}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="text-center pt10">
                        {this.renderMessages()}
                    </div>
                </div>


                <div className={classNames({[styles.add_message]: true})}>
                    <form class="ng-pristine ng-valid ng-valid-maxlength">
                        <div class="input-text-chat-container">
                            <div>
                               <span ng-if="!conversationService.selectedConversation.notInitialized">
                                   <textarea ref="textarea"
                                             ng-if="voiceNoteMenu === 0"
                                             ng-enter="conversationService.postMessage(vm.message, conversationService.selectedConversation); vm.message = ''; modalReferralSendMessage()"
                                             send-event-for-chat="" is-writing-model="vm"
                                             ng-disabled="!connectionStateService.hasConnection" id="textarea-messages"
                                             maxlength="1000"
                                             ng-focus="scrollToBottomOfTheChatOnFocus()" style={{height: 49}}
                                             ng-model="vm.message"
                                             class="newmessage type-message darker-scrollbar ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength"
                                             placeholder="Write a message">

                                   </textarea>
                                   <div onClick={this.sendMessage.bind(this)}
                                        className="fa fa-paper-plane toggle btn-send" style={{}}></div>
                                   {/*<div  class="fa fa-microphone toggle btn-voice-note"></div>*/}
                               </span>
                            </div>
                        </div>
                    </form>
                </div>


                {this.state.accept || this.state.friend.who === this.state.profile.Id ? null :
                    <div class="accept-ignore-request-box-in-messages">
                        <a class="btn btn-link btn-link-red mr40" style={{color: '#ffa1a1'}}
                           onClick={this.ignoreFriendship.bind(this)}>
                            Ignore
                        </a>
                        <a class="btn btn-link" style={{color: '#2f4053;'}} onClick={this.acceptFriendship.bind(this)}>
                            Accept
                        </a>
                    </div>}
            </div>
        )
    }

    ignoreFriendship() {
        UserServices.ignoreFriendship(this.props.friend.dialog_id, this.props.friend.friend_id);
    }

    acceptFriendship() {
        UserServices.acceptFriendship(this.props.friend.dialog_id, this.props.friend.friend_id);
    }

    sendMessage() {

        let toId = this.state.profile.Id === this.props.friend.user_id ? this.props.friend.friend_id : this.props.friend.user_id

        let message = {
            type: "sendMessage",
            action: "sendMessage",
            body: {
                dialog_id: this.props.friend.dialog_id,
                from_id: this.props.friend.user_id,
                to_id: this.props.friend.friend_id,
                text: this.refs.textarea.value
            }
        };
        console.log(message);
        UserStore.setLastDialog(this.props.friend.friend_id);

        this.props.socket.send(JSON.stringify(message));
    }

}
