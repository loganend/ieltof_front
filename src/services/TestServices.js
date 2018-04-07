import dispatcher from "../dispatcher";

export function onChatMessage(message) {
    dispatcher.dispatch({
        type: "CHAT_MESSAGE",
        message: message
    });
}
