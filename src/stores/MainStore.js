import React from "react";
import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import TestPage from "components/TestPage";
import MainPage from "components/MainPage";

class MainStore extends EventEmitter {
    constructor() {
        super();
        this.content = <div/>
    }


    emitContentChange() {
        this.emit("face_to_face_test");
    }

    getContent() {
        return this.content;
    }

    emitFacebookLogoutEvent() {
        this.emit("facebook_logpout_event");
    }

    handleActions(action) {
        switch (action.type) {
            case "FACE_TO_FACE_TEST":
                this.content = <TestPage/>;
                this.emitContentChange();
                break;
            case "FACEBOOK_LOGOUT":
                this.content = <MainPage/>;
                this.emitFacebookLogoutEvent();
                break;

        }

    }
}
const mainStore = new MainStore;
dispatcher.register(mainStore.handleActions.bind(mainStore));
export default mainStore;