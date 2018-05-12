import React from "react";
import {EventEmitter} from "events";
import dispatcher from "../dispatcher";


class UserStore extends EventEmitter {
    constructor() {
        super();
        this.state = {
            profile: {},
            users: [],
            friends: new Map(),
            dialog: null,
            lastDialog: 0
        }
    }

    setLastDialog(key) {
        this.state.lastDialog = key;
    }

    getProfile() {
        return this.state.profile;
    }

    emitUsersEvent() {
        this.emit("get_users_event");
    }

    getUsers() {
        return this.state.users;
    }

    emitChatPage() {
        this.emit("get_friends_event")
    }

    getFriends() {
        return this.state.friends;
    }

    getFriend(id) {
        return this.state.friends.get(id);
    }

    emitOpenDialog() {
        this.emit("open_dialog")
    }

    getDialog() {
        return this.state.dialog;
    }

    emitAcceptFriendship() {
        this.emit("accept_friendship");
    }

    emitIgnoreFriendship() {
        this.emit("ignore_friendship");
    }

    handleActions(action) {
        switch (action.type) {
            case "GET_USER_EVENT":
                console.log("GET_USER_EVENT");
                console.log(action.user);
                this.state.profile = action.user;
                this.emit("get_user_event")
                break;

            case "GET_ALL_USERS_EVENT":
                console.log(action.users);
                this.state.users = action.users;
                action.users.map((el, index) => {
                    if (el.Id === this.state.profile.Id) {
                        this.state.users.splice(index, 1);
                        return;
                    }
                });
                this.emitUsersEvent();
                break;

            case "GET_ALL_FRIENDS":
                action.friends.map((el => {
                    el.who = el.user_id;
                    el.friend_id = this.state.profile.Id === el.user_id ? el.friend_id : el.user_id;
                    el.user_id = this.state.profile.Id;
                    this.state.friends.set(el.friend_id, el);
                }));

                this.emitChatPage();
                break;

            case "OPEN_DIALOG":
                this.state.dialog = action.key;
                this.emitOpenDialog();
                break;

            case "REQUEST_FRIEND":
                this.emit("request_friend_" + action.person);
                break;

            case "ACCEPT_FRIENDSHIP":
                this.state.friends.get(action.dialog.friend_id).accept = true;
                this.emitAcceptFriendship();
                break;

            case "IGNORE_FRIENDSHIP":
                this.state.dialog = null;
                this.state.friends.delete(action.dialog.friend_id);
                this.emitIgnoreFriendship();
                break;

            case "REVIEVE_NEW_MESSAGE":
                if (this.state.profile.Id === action.message.UserId) {
                    if (this.state.friends.get(this.state.lastDialog).messages === null ||
                        this.state.friends.get(this.state.lastDialog).messages === undefined) {
                        this.state.friends.get(this.state.lastDialog).messages = [];
                    }

                    this.state.friends.get(this.state.lastDialog).messages.push(action.message);
                    this.emit("revieve_new_message_" + this.state.lastDialog);
                } else {
                    this.state.friends.get(action.message.UserId).messages.push(action.message);
                    this.emit("revieve_new_message_" + action.message.UserId);
                }

                break;
            default:
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;