import React, {Component} from "react";
import styles from "./ChatWindow.css";
import classNames from "classnames";

import ReceivedMessage from "components/ChatPage/ChatWindow/ReceivedMessage";
import SendMessage from "components/ChatPage/ChatWindow/SendMessage";

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={classNames({[styles.right_inbox]: true})}>
                <div className={classNames({[styles.top_bar_messages]: true})}>
                    <div
                        ng-if="conversationService.selectedConversation.type === CONSTANTS.CONVERSATIONS.ONE_TO_ONE_CONVERSATION">
                        <a class="link-to-profile"
                           ng-click="userCacheService.clearAndSetUser(conversationService.selectedConversation.user)"
                           ng-href="/user/1308722" href="/user/1308722">
                            Polyane
                        </a>
                        <is-online-green-button ng-if="!conversationService.selectedConversation.user.isConnected"
                                                class="text-last-connection"
                                                user="conversationService.selectedConversation.user" style={{}}>
                            <span style={{fontSize: 12, color: '#9AA2A7'}}>a day ago
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
                                         src="http://cdn-storage.speaky.com/image/78f28034-f9af-4c9f-b704-b7c0e400ead6.jpeg?resize-width=100&amp;resize-height=100"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="text-center pt10">
                        <SendMessage/>
                        <ReceivedMessage/>
                    </div>
                </div>
                <div className={classNames({[styles.add_message]: true})}>
                    <form class="ng-pristine ng-valid ng-valid-maxlength">
                        <div class="input-text-chat-container">
                            <div>
                               <span ng-if="!conversationService.selectedConversation.notInitialized">
                                   <textarea ng-if="voiceNoteMenu === 0"
                                             ng-enter="conversationService.postMessage(vm.message, conversationService.selectedConversation); vm.message = ''; modalReferralSendMessage()"
                                             send-event-for-chat="" is-writing-model="vm"
                                             ng-disabled="!connectionStateService.hasConnection" id="textarea-messages"
                                             maxlength="1000"
                                             ng-focus="scrollToBottomOfTheChatOnFocus()" style={{height: 49}}
                                             ng-model="vm.message"
                                             class="newmessage type-message darker-scrollbar ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength"
                                             placeholder="Write a message">

                                   </textarea>
                                   <div
                                       ng-if="conversationService.isConversationAccepted(conversationService.selectedConversation) &amp;&amp; !vm.message &amp;&amp; connectionStateService.hasConnection &amp;&amp; voiceNoteMenu === 0"
                                       ng-click="nextStep()" class="fa fa-microphone toggle btn-voice-note">

                                   </div>
                               </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
