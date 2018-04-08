import dispatcher from "../dispatcher";

export function faceToFaceTest() {
    dispatcher.dispatch({
        type: "FACE_TO_FACE_TEST"
    });
}
