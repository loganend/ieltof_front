import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TestStore extends EventEmitter {
    constructor() {
        super();
        this.chatMessage = {};
    }

    emitChatMessage() {
        this.emit("chat_message");
    }

    getChatMessage() {
        return this.chatMessage;
    }

    handleActions(action) {
        switch(action.type) {
            case "CHAT_MESSAGE": {
                this.chatMessage = action.message;
                console.log(this.chatMessage);
                this.emitChatMessage();
                break;
            }
        }
    }

}

const testStore = new TestStore;
dispatcher.register(testStore.handleActions.bind(testStore));

export default testStore;