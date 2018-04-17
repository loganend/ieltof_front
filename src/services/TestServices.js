import dispatcher from "../dispatcher";

export function onChatMessage(message) {
    dispatcher.dispatch({
        type: "CHAT_MESSAGE",
        message: message
    });
}


export function onTestQuestions(test) {
    dispatcher.dispatch({
        type: "TEST_QUESTIONS",
        test: test
    });
}
