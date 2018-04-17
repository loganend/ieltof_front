import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class TestStore extends EventEmitter {
    constructor() {
        super();
        this.chatMessage = {};
        this.test = {}
    }

    emitChatMessage() {
        this.emit("chat_message");
    }

    getChatMessage() {
        return this.chatMessage;
    }

    emitTestQuestions() {
        this.emit("test_questions");
    }

    getTestQuestions() {
        return this.test;
    }

    handleActions(action) {
        switch (action.type) {
            case "CHAT_MESSAGE":
                this.chatMessage = action.message;
                console.log(this.chatMessage);
                this.emitChatMessage();
                break;

            case "TEST_QUESTIONS":
                this.test = action.test;
                this.emitTestQuestions();
                break;

        }
    }

}

const testStore = new TestStore;
dispatcher.register(testStore.handleActions.bind(testStore));

export default testStore;