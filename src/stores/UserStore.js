import React from "react";
import {EventEmitter} from "events";
import dispatcher from "../dispatcher";


class UserStore extends EventEmitter {
    constructor() {
        super();
        this.state = {
            profile: {},
            users: [],
            friends: new Map()
        }
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

    handleActions(action) {
        switch (action.type) {
            case "GET_USER_EVENT":
                console.log("GET_USER_EVENT");
                console.log(action.user);
                this.state.profile = action.user;
                break;

            case "GET_ALL_USERS_EVENT":
                console.log(action.users);
                this.state.users = action.users;
                this.emitUsersEvent();
                break;

            case "GET_ALL_FRIENDS":

                action.friends.map((el => {
                    this.state.friends.set(el.friend_id, el);
                }));

                this.emitChatPage();
            default:

        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;