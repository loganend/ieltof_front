import React from "react";
import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import TestPage from 'components/TestPage';

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

    handleActions(action) {
        switch(action.type) {
            case "FACE_TO_FACE_TEST": {
                this.content = <TestPage/>;
                this.emitContentChange();
                break;
            }
        }
    }

}

const mainStore = new MainStore;
dispatcher.register(mainStore.handleActions.bind(mainStore));

export default mainStore;