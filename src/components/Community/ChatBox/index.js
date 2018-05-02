import React, {Component} from "react";

export default class ChatBox extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        console.log(1);
        return (
            <div class="container-conversations-on-top" ng-controller="modifyMessageController as modifyMessage">
                <div
                    ng-class="{'one-conversation-on-top': true , 'expanded': conversation.isExpanded, 'new-message':conversation.hasNewMessage}"
                    ng-repeat="conversation in conversationsOnTop" ng-if="conversation.isDisplayedInFront"
                    id="conversation0" class="one-conversation-on-top expanded">
                    <one-conversation-box>
                        <div class="inside-conversation-on-top">

                            <div class="top-bar-conversation-on-top"
                                 ng-click="messagesOnTop.toggleConversation(conversation, $event, conversation.isExpanded)">
                                <div class="name-part-conversation">
                                    <a ng-click="userCacheService.clearAndSetUser(conversation.user)"
                                       ng-if="((conversation.type == CONSTANTS.CHAT.ONE_ON_ONE || conversation.type == CONSTANTS.CHAT.LIVE_CHAT)  || conversation.isInit) &amp;&amp; conversation.isExpanded"
                                       ng-href="/user/2251747" href="/user/2251747">
                                        махмуд T.
                                    </a>
                                </div>
                                <div class="toggle-button-sidebar-chat buttons-conversation-on-top">
                                    <a class="btn-conversation-on-top-bar"
                                       ng-click="toggleQuestions(conversation); hideBoxInformationConversationBox()">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                    <a class="btn-conversation-on-top-bar display-when-not-expanded"
                                       ng-click="messagesOnTop.closeConversation(conversation);">
                                        <span class="fa fa-remove"></span>
                                    </a>
                                </div>
                            </div>

                            <if ng-if="conversation.isExpanded"
                                ng-click="conversationService.setConversationToSeen(conversation)">
                                <div ng-if="!conversation.user.isAccepted &amp;&amp; conversation.isInit"
                                     class="conversation-not-yet-accepted"
                                     ng-bind-html="'CONVERSATION_NOT_YET_ACCEPTED' | translate:{value: conversation.user.firstname}">
                                    махмуд hasn't accepted your request yet
                                </div>

                                <div
                                    ng-class="(!conversation.user.isAccepted &amp;&amp; conversation.isInit) ? 'message-conversation-on-top-not-accepted-height' : 'message-conversation-on-top-accepted-height'"
                                    class="messages-conversation-on-top message-conversation-on-top-not-accepted-height"
                                    scroll-on-appear="" scroll-down-on-new-message=""
                                    look-at="conversation.messages.length" reverse-infinite-scroll="">

                                    <user-information
                                        ng-if="allMessagesLoaded || conversation.messages.length <= messageLimit"
                                        conversation="conversation">
                                        <div class="user-information">
                                            <div class="relative">

                                                <div
                                                    ng-if="conversation.type === CONSTANTS.CONVERSATIONS.ONE_TO_ONE_CONVERSATION">
                                                    <a ng-click="userCacheService.clearAndSetUser(conversation.user)"
                                                       ng-href="/user/2251747/" href="/user/2251747/">
                                                        <img class="profile-picture-conversation" style={{width:115}}
                                                             ng-src="http://cdn-storage.speaky.com/image/cfeac71d-eeb0-4ef0-9f14-57a5ea4e4d72.jpeg?resize-width=100&amp;resize-height=100"
                                                             src="http://cdn-storage.speaky.com/image/cfeac71d-eeb0-4ef0-9f14-57a5ea4e4d72.jpeg?resize-width=100&amp;resize-height=100"/></a>
                                                    <div class="user-info-native-flag-container">
                                                        <flag-language user="conversation.user" language-level="6"
                                                                       more-languages="0" language-label="false">
                                                            <div
                                                                ng-class=" languageLevel === 6 ? 'container-native-language relative container-flag' : 'container-flag relative'"
                                                                class="container-native-language relative container-flag">
                                                                <div class="display-table">
                                                                    <div
                                                                        ng-class="isInConversationView ? 'language-container-flag pd2 br3' : 'language-container-flag'"
                                                                        class="language-container-flag">
                                                                        <div
                                                                            ng-if="nativeLanguageIds &amp;&amp; languageLevel === 6 &amp;&amp; !isInConversationView"
                                                                            class="flag40 English40"></div>


                                                                    </div>

                                                                </div>


                                                            </div>
                                                        </flag-language>
                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                ng-if="conversation.type === CONSTANTS.CONVERSATIONS.ONE_TO_ONE_CONVERSATION"
                                                class="mt20 color-333">
            <span ng-if="conversation.user.interests.length">
                        <b>махмуд</b> is interested in <span
                ng-repeat="interest in conversation.user.interests | limitTo: 4"><b>Sports<span ng-if="!$last">, </span></b></span><span
                ng-repeat="interest in conversation.user.interests | limitTo: 4"><b>Music<span ng-if="!$last">, </span></b></span><span
                ng-repeat="interest in conversation.user.interests | limitTo: 4"><b>Science<span
                ng-if="!$last">, </span></b></span>
                <span ng-repeat="interest in conversation.user.interests | limitTo: 4"><b>Books &amp;
                    Literature</b></span><span
                ng-if="conversation.user.interests.length > 4"> and <b>16 more  </b></span>
                    </span>
                                            </div>

                                        </div>


                                    </user-information>

                                    <conversation-starter message="conversation.message"
                                                          conversation="conversation"></conversation-starter>

                                    <display-message ng-repeat="message in conversation.messages | limitTo:-vm.limit"
                                                     ng-class="['messages-on-top',{'mess-line-chat-received':(message.userId != user.id)},
                               {'mess-line-chat-sent-inbox':(message.userId == user.id)}]"
                                                     class="messages-on-top mess-line-chat-sent-inbox">
                                        <div ng-class="['message-row message-row-in-messages',{'received-message-row':(message.userId != user.id)},
                               {'sent-message-row':(message.userId == accountService.user.id)}, {'mobile':(!displayLeft &amp;&amp; displayRight)}]"
                                             ng-if="::(message.type == CONSTANTS.MESSAGES.TYPE.MESSAGE)"
                                             class="message-row message-row-in-messages sent-message-row">
                                            <div
                                                ng-class="[{'hovering-pencil':message.isHoveringPencil}, {'message-on-hold':!message.id}]">
                                                <div class="small-profile-picture-in-messages"
                                                     ng-if="!message.isEditingMessage">

                                                </div>
                                                <div class="message-bubble-in-messages"
                                                     ng-if="!message.isEditingMessage">
                                                    <div tooltip="" tooltip-position="top-left" tooltip-margin="3"
                                                         tooltip-if="true" tooltip-text=" Today at 4:17 PM">

                                                        <span
                                                            ng-bind-html="utilitiesService.returnRedDifferences(message.data.message, message.data.correction) | sanitizeMessage | codeToSmiley | generateHTMLLink">Hey.</span>

                                                    </div>

                                                    <div class="btn-edit-on-message"
                                                         ng-if="::(message.userId == accountService.user.id &amp;&amp; message.id)"
                                                         tooltip="" tooltip-position="top-right" tooltip-margin="0"
                                                         tooltip-text="Edit"
                                                         ng-mouseenter="modifyMessage.hoveringPencil(message);"
                                                         ng-mouseleave="modifyMessage.stopHoveringPencil(message);"
                                                         ng-click="modifyMessage.openEditingForMessage(message);tooltipService.hideTooltip();">
                                                        <span class="fa fa-pencil"></span>
                                                    </div>

                                                </div>
                                            </div>


                                        </div>


                                    </display-message>
                                    <realtime-information-one-box>
                                        <div class="container-have-seen-users" tooltip="" tooltip-position="top-left"
                                             tooltip-text="Seen by" tooltip-margin="2">
                                            <div>

                                            </div>
                                        </div>
                                    </realtime-information-one-box>
                                </div>
                                <div class="bottom-conversation-on-top">
                                    <textarea ng-if="oneConversationBox.voiceNoteMenu === 0" id="textarea0"
                                              ng-focus="messagesOnTop.focusOnTextarea($index, conversation)"
                                              ng-blur="messagesOnTop.blurOnTextarea($index)" maxlength="1000"
                                              style={{height: 32, overflow: 'hidden',wordWrap:'break-word', resize: 'nonw'}}
                                              ng-trim="false" msd-elastic=""
                                              ng-enter="messagesOnTop.sendMessage(conversation)"
                                              ng-model="conversation.message"
                                              ng-change="messagesOnTop.updateTextareaAndConversationHeight($index);"
                                              send-event-for-chat="" is-writing-model="conversation"
                                              conversation-id="68279819" conversation="conversation"
                                              class="textarea-conversation-on-top-voice-note ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched"
                                              placeholder="Write a message">        </textarea>
                                    <button-emoticons ng-if="oneConversationBox.voiceNoteMenu === 0"
                                                      message-model="conversation.message" textarea-id="textarea0">
                                        <div class="dropup emoji-container">
                                            <a ng-class="{'btn-emojis':true, 'open':isOpenEmojisPopUp}"
                                               ng-click="toggleEmojisPopUp($event)" type="button" id="dropdownMenu2"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                                               class="btn-emojis">
    <span class="fa fa-smile-o">
          </span>
                                            </a>
                                            <ul class="dropdown-menu dropdown-emoji-message dropdown-emoji-conversation-box"
                                                aria-labelledby="dropdownMenu2">
                                                <div class="menu-emojis">

                                                </div>
                                            </ul>
                                        </div>
                                    </button-emoticons>
                                </div>
                            </if>
                        </div>

                    </one-conversation-box>
                </div>

                <hidden-conversations-dropdown></hidden-conversations-dropdown>
            </div>

        )
    }

}



